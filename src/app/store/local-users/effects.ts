import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { LocalUserService } from '../../users/shared/local-user.service';
import { READ_LOCAL_USERS, ReadLocalUsers, ReadLocalUsersSuccess } from './actions';


@Injectable()
export class LocalUsersEffects {
  // Listen for the 'FETCH_USERS_API' action
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

  constructor(
    private actions$: Actions,
    private localUserService: LocalUserService
  ) { }
}
