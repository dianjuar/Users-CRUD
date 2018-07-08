import { LocalUser } from '../../users/shared/models/local-user.model';
import * as LocalUserActions from './actions';

export interface LocalUsersState {
  users: LocalUser[];
}

export const initialLocalUsersState: LocalUsersState = {
  users: []
};

export function localUserReducer(
  state: LocalUsersState = initialLocalUsersState,
  action: LocalUserActions.All
): LocalUsersState {

  switch (action.type) {
    case LocalUserActions.READ_LOCAL_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload
      };
    }

    default: {
      return state;
    }
  }

}
