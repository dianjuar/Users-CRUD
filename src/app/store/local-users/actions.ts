import { Action } from '@ngrx/store';
import { LocalUser } from '../../users/shared/models/local-user.model';

export const READ_LOCAL_USERS = '[Local Users] Read';
export const READ_LOCAL_USERS_SUCCESS = '[Local Users] Read Success';

/**
 * Action to read users from the local storage
 *
 * @export
 * @class ReadLocalUsers
 * @implements {Action}
 */
export class ReadLocalUsers implements Action {
  readonly type = READ_LOCAL_USERS;

  constructor() { }
}

/**
 * Action to set read users from local storage in the state
 *
 * @export
 * @class ReadLocalUsersSuccess
 * @implements {Action}
 */
export class ReadLocalUsersSuccess implements Action {
  readonly type = READ_LOCAL_USERS_SUCCESS;

  constructor(public payload: LocalUser[]) { }
}

export type All =
  ReadLocalUsers |
  ReadLocalUsersSuccess;
