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
  userUpdated?: LocalUser;
  userDeleted?: LocalUser;
  /**
   * To indicate that an error occur when Creating, Updating or Deleting
   *
   * @type {boolean}
   * @memberof LocalUsersState
   */
  userCUDFailed?: boolean;
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

    case LocalUserActions.CREATE_LOCAL_USER: {
      return {
        ...state,
        loadingCUD: true,
        userCUDFailed: false
      };
    }

    case LocalUserActions.CREATE_LOCAL_USER_SUCCESS: {
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
        loadingReading: true
      };
    }

    case LocalUserActions.READ_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        loadingReading: false,
        users: action.payload
      };
    }

    case LocalUserActions.UPDATE_LOCAL_USER: {
      return {
        ...state,
        loadingCUD: true,
        userCUDFailed: false
      };
    }

    case LocalUserActions.UPDATE_LOCAL_USER_SUCCESS: {
      const payload = (action as LocalUserActions.UpdateLocalUserSuccess).payload;
      return {
        ...state,
        loadingCUD: false,
        userUpdated: payload.modifiedUser,
        users: payload.users
      };
    }

    case LocalUserActions.DELETE_LOCAL_USER: {
      return {
        ...state,
        loadingCUD: true,
        userCUDFailed: false
      };
    }

    case LocalUserActions.DELETE_LOCAL_USER_SUCCESS: {
      const payload = (action as LocalUserActions.DeleteLocalUserSuccess).payload;
      return {
        ...state,
        loadingCUD: false,
        users: payload.users,
        userDeleted: payload.modifiedUser
      };
    }

    case LocalUserActions.CUD_LOCAL_USER_FAILED: {
      return {
        ...state,
        loadingCUD: false,
        userCUDFailed: true
      };
    }

    default: {
      return state;
    }
  }

}
