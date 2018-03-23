import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LocalUser } from './local-user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';

import { LoadingService } from '../../shared/loading-service';

@Injectable()
export class LocalUserService extends LoadingService {

  /**
   * The endpoint to "save" the users
   */
  private readonly saveUsersEndPoint = 'https://reqres.in/api/users';

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  /**
   * Save user and return an observable to know when we finish the operation
   *
   * @param user The user to save
   * @returns {Observable<boolean>} To subscribe and know it finish
   */
  saveUser(user: LocalUser): Observable<boolean> {
    this.imLoading();

    this.http.post(this.saveUsersEndPoint, { })
      .do(() => console.log('saved'))
      .subscribe(
        () => {

          this.loadingDone();
        }
      );

      return this.isLoading();
  }

}
