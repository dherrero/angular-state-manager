import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class StateService<T> {
  #storeName: string;
  #defaultState: T;
  #store: BehaviorSubject<T>;
  #data$: Observable<T>;
  #cacheStore: boolean;
  #reducers: Map<string, (state: T, payload: unknown) => T>;
  #storageApi: 'localStorage' | 'sessionStorage';

  constructor(
    storeName: string,
    defaultState: T,
    reducers: Map<string, (state: T, payload: unknown) => T>,
    cacheStore: boolean = true,
    storageApi: 'localStorage' | 'sessionStorage' = 'localStorage'
  ) {
    this.#storeName = storeName;
    this.#defaultState = defaultState;
    this.#reducers = reducers;
    this.#cacheStore = cacheStore;
    this.#storageApi = storageApi;

    this.#store = new BehaviorSubject<T>(
      this.#cacheStore ? this.#getCache() : this.#defaultState
    );
    this.#data$ = this.#store.asObservable().pipe(distinctUntilChanged());
  }

  // SELECT
  select$<S>(key: keyof T): Observable<S> {
    return this.#data$.pipe(
      map((state) => this.#deepFreeze<S>(state[key])), // deepFreeze prevents data exposed being altered by reference
      distinctUntilChanged()
    );
  }

  // GETTER
  get<S>(key: keyof T): S {
    return this.#store.getValue()[key] as unknown as S;
  }

  // DISPATCHER
  dispatch(action: string, payload: unknown) {
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
    }
  }

  clearCache() {
    window[this.#storageApi].removeItem(this.#storeName);
  }

  #deepFreeze<S>(object: T[keyof T]): S {
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
