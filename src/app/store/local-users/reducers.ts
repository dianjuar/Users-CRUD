import { LocalUser } from '../../users/shared/models/local-user.model';
import * as LocalUserActions from './actions';

export interface LocalUsersState {
  users: LocalUser[];
  loading: boolean;
  userCreated?: LocalUser;
}

export const initialLocalUsersState: LocalUsersState = {
  users: [],
  loading: false
};

export function localUserReducer(
  state: LocalUsersState = initialLocalUsersState,
  action: LocalUserActions.All
): LocalUsersState {

  switch (action.type) {

    case LocalUserActions.CREATE_LOCAL_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case LocalUserActions.CREATE_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: [ ...state.users, action.payload ],
        userCreated: action.payload
      };
    }

    case LocalUserActions.READ_LOCAL_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case LocalUserActions.READ_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    }

    default: {
      return state;
    }
  }

}
