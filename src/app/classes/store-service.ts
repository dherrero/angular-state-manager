import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class StoreService<T> {
  #storeName: string;
  #defaultState: T;
  #store: BehaviorSubject<T>;
  #data$: Observable<T>;
  #reducers: Map<string, (state: T, payload: unknown) => T>;
  #freezStore: boolean;
  #cacheStore: boolean;
  #storageApi: 'localStorage' | 'sessionStorage';

  constructor(
    storeName: string,
    defaultState: T,
    reducers: Map<string, (state: T, payload: unknown) => T>,
    freezeStore: boolean = true,
    cacheStore: boolean = true,
    storageApi: 'localStorage' | 'sessionStorage' = 'localStorage'
  ) {
    this.#storeName = storeName;
    this.#defaultState = defaultState;
    this.#reducers = reducers;
    this.#freezStore = freezeStore;
    this.#cacheStore = cacheStore;
    this.#storageApi = storageApi;

    this.#store = new BehaviorSubject<T>(
      this.#cacheStore ? this.#getCache() : this.#defaultState
    );
    this.#data$ = this.#store.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * @param   key, Store's first level key
   * @returns Observable<type of Key>, It will emit changes when the Store key changes.
   */
  select<S>(key: keyof T): Observable<S> {
    return this.#data$.pipe(
      map((state) =>
        this.#freezStore
          ? this.#deepFreeze<S>(state[key])
          : (state[key] as unknown as S)
      ),
      distinctUntilChanged()
    );
  }

  // GETTER
  get<S>(key: keyof T): S {
    return this.#store.getValue()[key] as unknown as S;
  }

  // DISPATCHER
  dispatch<S>(action: string, payload: S) {
    const reducer = this.#reducers.get(action);
    if (reducer) {
      const newState: T = reducer(this.#store.getValue(), payload);
      this.#store.next(newState);
      if (this.#cacheStore) {
        window[this.#storageApi].setItem(
          this.#storeName,
          JSON.stringify(newState)
        );
      }
    } else {
      throw new Error(`Error action ${action} not found in reducers Map`);
    }
  }

  clearCache() {
    window[this.#storageApi].removeItem(this.#storeName);
  }

  // deepFreeze prevents data exposed being altered by reference
  // eslint-disable-next-line complexity
  #deepFreeze<S>(object: T[keyof T]): S {
    if (!object) return object as unknown as S;
    const propNames = Object.getOwnPropertyNames(object);
    const isObject = (val: unknown): boolean =>
      Boolean(val && typeof val === 'object');

    for (const name of propNames) {
      const value = (object as never)[name];
      if (isObject(value)) {
        this.#deepFreeze(value);
      }
    }

    return Object.freeze(object) as unknown as S;
  }

  #parse<S>(objStr: string | null): S | null {
    return objStr !== null ? (JSON.parse(objStr) as S) : objStr;
  }

  #getCache(): T {
    return (
      this.#parse<T>(window[this.#storageApi].getItem(this.#storeName)) ||
      this.#defaultState
    );
  }
}
