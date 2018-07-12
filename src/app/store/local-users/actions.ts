import { Action } from '@ngrx/store';
import { LocalUser } from '../../users/shared/models/local-user.model';

export const CREATE_LOCAL_USER = '[Local Users] Create';
export const CREATE_LOCAL_USER_SUCCESS = '[Local Users] Create Success';

export const READ_LOCAL_USERS = '[Local Users] Read';
export const READ_LOCAL_USERS_SUCCESS = '[Local Users] Read Success';

export const DELETE_LOCAL_USER = '[Local Users] Delete';
export const DELETE_LOCAL_USER_SUCCESS = '[Local Users] Delete Success';

/**
 * Action to create an user
 *
 * @export
 * @class Class
 * @implements {Action}
 */
export class CreateLocalUser implements Action {
  readonly type = CREATE_LOCAL_USER;

  constructor(public payload: LocalUser) { }
}

/**
 * Action to indicate that the user creation finish
 * successfully
 *
 * @export
 * @class Class
 * @implements {Action}
 */
export class CreateLocalUserSuccess implements Action {
  readonly type = CREATE_LOCAL_USER_SUCCESS;

  constructor(public payload: LocalUser) { }
}

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

/**
 * Action to read users from the local storage
 *
 * @export
 * @class ReadLocalUsers
 * @implements {Action}
 */
export class DeleteLocalUser implements Action {
  readonly type = DELETE_LOCAL_USER;

  constructor(public payload: LocalUser) { }
}


export interface DeleteLocalUserSuccessPayloadModel {
  deletedUser: LocalUser;
  users: Array<LocalUser>;
}
/**
 * Action to set read users from local storage in the state
 *
 * @export
 * @class ReadLocalUsersSuccess
 * @implements {Action}
 */
export class DeleteLocalUserSuccess implements Action {
  readonly type = DELETE_LOCAL_USER_SUCCESS;

  constructor(public payload: DeleteLocalUserSuccessPayloadModel) { }
}

export type All =
  CreateLocalUser |
  CreateLocalUserSuccess |
  ReadLocalUsers |
  ReadLocalUsersSuccess |
  DeleteLocalUser |
  DeleteLocalUserSuccess;
