import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { LocalUserService } from '../../users/shared/local-user.service';
import {
  CREATE_LOCAL_USER,
  CreateLocalUser,
  CreateLocalUserSuccess,
  READ_LOCAL_USERS,
  ReadLocalUsers,
  ReadLocalUsersSuccess,
  DELETE_LOCAL_USER,
  DeleteLocalUser,
  DeleteLocalUserSuccess,
  ModifiedLocalUserSuccessPayloadModel,
  UpdateLocalUser,
  UPDATE_LOCAL_USER,
  UpdateLocalUserSuccess,
} from './actions';


@Injectable()
export class LocalUsersEffects {

  // Listen for the 'CREATE_LOCAL_USERS' action
  @Effect()
  createUserOnLocal$: Observable<Action> = this.actions$.pipe(
    ofType(CREATE_LOCAL_USER),
    mergeMap((action: CreateLocalUser) =>
      this.localUserService.saveUser(action.payload).pipe(
        // If successful, dispatch success action with the user created
        map(() => new CreateLocalUserSuccess(action.payload)),
      )
    )
  );

  // Listen for the 'READ_LOCAL_USERS' action
  @Effect()
  readUsersFromLocal$: Observable<Action> = this.actions$.pipe(
    ofType(READ_LOCAL_USERS),
    mergeMap((action: ReadLocalUsers) =>
      this.localUserService.loadLocalUsers().pipe(
        // If successful, dispatch success action with result
        map(users => new ReadLocalUsersSuccess(users)),
      )
    )
  );

  // Listen for the 'UPDATE_LOCAL_USERS' action
  @Effect()
  updateUsersFromLocal$: Observable<Action> = this.actions$.pipe(
    ofType(UPDATE_LOCAL_USER),
    mergeMap((action: UpdateLocalUser) =>
      this.localUserService.updateUser(action.payload).pipe(
        // If successful, dispatch success action with result
        map((updateUserResult: ModifiedLocalUserSuccessPayloadModel) => new UpdateLocalUserSuccess(updateUserResult)),
      )
    )
  );

  // Listen for the 'READ_LOCAL_USERS' action
  @Effect()
  deleteUserFromLocal$: Observable<Action> = this.actions$.pipe(
    ofType(DELETE_LOCAL_USER),
    mergeMap((action: DeleteLocalUser) =>
      this.localUserService.deleteUser(action.payload).pipe(
        // If successful, dispatch success action with result
        map((deleteUserResult: ModifiedLocalUserSuccessPayloadModel) => new DeleteLocalUserSuccess(deleteUserResult)),
      )
    )
  );

  constructor(
    private actions$: Actions,
    private localUserService: LocalUserService
  ) { }
}
