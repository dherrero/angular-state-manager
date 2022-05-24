import { Injectable } from '@angular/core';
import { UserState, defaultUserState } from '@models/user.state';
import { userReducer } from './reducers';
import { StateService } from 'app/classes/state-service';

/**
 * UserStoreService
 */
@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends StateService<UserState> {
  constructor() {
    super('userState', defaultUserState, userReducer, true);
  }
}
