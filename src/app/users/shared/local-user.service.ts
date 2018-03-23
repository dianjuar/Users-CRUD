import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LocalUser } from './local-user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';

import { LoadingService } from '../../shared/loading-service';

@Injectable()
export class LocalUserService extends LoadingService {

  /**
   * List of users saved on local storage
   */
  users: Array<LocalUser>;

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
   * @returns {Observable<boolean | string>}
   *          To subscribe and know it finish. In case the email already exits
   *          will throw an observable error
   */
  saveUser(user: LocalUser): Observable<boolean | string> {
    this.imLoading();

    // Verify if the email already exits
    if (this.theEmailExists(user.email)) {
      this.loadingDone();
      return Observable.throw('the email already exits');
    }

    this.http.post(this.saveUsersEndPoint, { })
      .subscribe(
        () => {
          this.loadingDone();
        }
      );

    return this.isLoading();
  }

  /**
   * Verify if an email already exits
   *
   * @param emailToCheck The email to verify if exits
   * @returns {boolean} True - some user already have that email
   *                    False - no one has it
   */
  private theEmailExists(emailToCheck) {
    // return true; // useful to debug
    return this.users
      // Pass only the email of the local users
      .map((localUser: LocalUser) => localUser.email)
      // Filter only the email
      .some((userEmail) => userEmail === emailToCheck);
  }

}
