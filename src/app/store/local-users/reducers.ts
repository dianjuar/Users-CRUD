import { LocalUser } from '../../users/shared/models/local-user.model';
import * as LocalUserActions from './actions';

export interface LocalUsersState {
  users: LocalUser[];
  loading: boolean;
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
