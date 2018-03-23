import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalUser } from './local-user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';

import { LoadingService } from '../../shared/loading-service';
import { LocalStorageService } from 'ngx-localstorage';

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
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    super();

    // Init the local users
    this.users = new Array<LocalUser>();

    // Load the users from local storage
    this.loadLocalUsers();
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
      // Save the user on local storage
      .switchMap(() => this.saveUserOnLocalStorage(user))
      .subscribe(
        () => {
          this.loadingDone();
        }
      );

    return this.isLoading();
  }

  /**
   * Load the users form the local storage and assign them to
   * our array of users
   */
  private loadLocalUsers() {
    this.imLoading();

    // Load the stored users
    Observable.fromPromise(this.localStorageService.asPromisable().get('users'))
      // Parse the stored array to a json
      .map((usersOnLocalStorage: string) => JSON.parse(usersOnLocalStorage))
      // Return only one user
      .switchMap((localUsers: Array<any>) => localUsers)
      // Transform the user from simple json to our model
      .map((localUser: any) => new LocalUser(
        localUser.firstName,
        localUser.lastName,
        localUser.email,
        localUser.phone,
        localUser.birthDate))
      // Collect all the users in an array
      .reduce((localUsers: Array<LocalUser>, user: LocalUser) => {
        localUsers.push(user);
        return localUsers;
      }, new Array<LocalUser>())
      // Assign the user list to our list
      .subscribe(
        (localUsers: Array<LocalUser>) => {
          this.users.push(...localUsers);
          this.loadingDone();
        }
      );
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

  /**
   * Save on local storage the given user
   * Try to save it, if goes well push in the array
   *
   * @param userToSave The user to save in the local storage
   */
  private saveUserOnLocalStorage(userToSave: LocalUser): Observable<any> {
    // Make a clone of the users and assign the new user
    const localUsers = this.users.slice();
    localUsers.push(userToSave);

    // Save on local storage
    return Observable.fromPromise(this.localStorageService.asPromisable().set('users', JSON.stringify(localUsers)))
      // If everything goes well assign the new user to the localUser array
      .do(() => this.users.push(userToSave));
  }

}
