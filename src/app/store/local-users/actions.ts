import { Action } from '@ngrx/store';
import { LocalUser } from '../../users/shared/models/local-user.model';

export const CREATE_LOCAL_USER = '[Local Users] Create';
export const CREATE_LOCAL_USER_SUCCESS = '[Local Users] Create Success';

export const READ_LOCAL_USERS = '[Local Users] Read';
export const READ_LOCAL_USERS_SUCCESS = '[Local Users] Read Success';

export const UPDATE_LOCAL_USER = '[Local Users] Update';
export const UPDATE_LOCAL_USER_SUCCESS = '[Local Users] Update Success';

export const DELETE_LOCAL_USER = '[Local Users] Delete';
export const DELETE_LOCAL_USER_SUCCESS = '[Local Users] Delete Success';

/**
 * Action to create an user
 *
 * @export
 * @class CreateLocalUser
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
 * @class CreateLocalUserSuccess
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
 * Action to update an user
 *
 * @export
 * @class UpdateLocalUser
 * @implements {Action}
 */
export class UpdateLocalUser implements Action {
  readonly type = UPDATE_LOCAL_USER;

  constructor(public payload: LocalUser) { }
}

/**
 * Action to indicate that the user update finish
 * successfully
 *
 * @export
 * @class UpdateLocalUserSuccess
 * @implements {Action}
 */
export class UpdateLocalUserSuccess implements Action {
  readonly type = UPDATE_LOCAL_USER_SUCCESS;

  constructor(public payload: ModifiedLocalUserSuccessPayloadModel) { }
}

/**
 * Action to delete users from the local storage
 *
 * @export
 * @class ReadLocalUsers
 * @implements {Action}
 */
export class DeleteLocalUser implements Action {
  readonly type = DELETE_LOCAL_USER;

  constructor(public payload: LocalUser) { }
}

/**
 * Action to set read users from local storage in the state
 *
 * @export
 * @class DeleteLocalUserSuccess
 * @implements {Action}
 */
export class DeleteLocalUserSuccess implements Action {
  readonly type = DELETE_LOCAL_USER_SUCCESS;

  constructor(public payload: ModifiedLocalUserSuccessPayloadModel) { }
}

export interface ModifiedLocalUserSuccessPayloadModel {
  modifiedUser: LocalUser;
  users: Array<LocalUser>;
}

export type All =
  CreateLocalUser |
  CreateLocalUserSuccess |
  ReadLocalUsers |
  ReadLocalUsersSuccess |
  UpdateLocalUser |
  UpdateLocalUserSuccess |
  DeleteLocalUser |
  DeleteLocalUserSuccess;
