import { LocalUser } from '../../users/shared/models/local-user.model';
import * as LocalUserActions from './actions';

export interface LocalUsersState {
  users: LocalUser[];
  /**
   * To indicate the loading operation on
   * Create Update and Delete
   *
   * @type {boolean}
   * @memberof LocalUsersState
   */
  loadingCUD: boolean;
  /**
   * To indicate that we are loading when
   * Read local users
   *
   * @type {boolean}
   * @memberof LocalUsersState
   */
  loadingReading: boolean;
  userCreated?: LocalUser;
}

export const initialLocalUsersState: LocalUsersState = {
  users: [],
  loadingCUD: false,
  loadingReading: false
};

export function localUserReducer(
  state: LocalUsersState = initialLocalUsersState,
  action: LocalUserActions.All
): LocalUsersState {

  switch (action.type) {

    case LocalUserActions.CREATE_LOCAL_USERS: {
      return {
        ...state,
        loadingCUD: true,
      };
    }

    case LocalUserActions.CREATE_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        loadingCUD: false,
        users: [ ...state.users, action.payload ],
        userCreated: action.payload
      };
    }

    case LocalUserActions.READ_LOCAL_USERS: {
      return {
        ...state,
        loadingReading: true,
      };
    }

    case LocalUserActions.READ_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        loadingReading: false,
        users: action.payload
      };
    }

    default: {
      return state;
    }
  }

}
