
import {from as observableFrom, throwError as observableThrowError,  Observable } from 'rxjs';

import {map, timeout, reduce, tap, retry, switchMap, toArray} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalUser } from '../shared/models/local-user.model';

import { LoadingService } from '../../shared/loading-service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Store, select } from '@ngrx/store';
import { AppState, selectLocalUsers } from '../../store';


@Injectable()
export class LocalUserService extends LoadingService {

  /**
   * List of users saved on local storage
   */
  users: Array<LocalUser>;

  /**
   * The endpoint to "save" the users
   */
  private readonly usersEndpoint = 'https://reqres.in/api/users/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorage,
    private store: Store<AppState>
  ) {
    super();

    // Get the local users from the store
    this.store.pipe(select(selectLocalUsers))
      .subscribe((users) => {
        this.users = users;
      });
  }

  /**
   * Do the post to know the user ID, then, save the users on the local
   * storage
   *
   * @param user The user to save
   * @returns {Observable<LocalUser>} The observable with created user
   */
  saveUser(user: LocalUser): Observable<LocalUser> {
    // Verify if the email already exits
    /* if (this.theEmailExists(user.email)) {
      this.loadingDone();
      return observableThrowError({
        type: 'duplicateEmail',
        message: 'the email already exits'
      });
    } */

    return this.http.post(this.usersEndpoint, { }).pipe(
      // give it 3seconds to make the operation
      timeout(3000),
      // Retry the operation 3 times on error
      retry(3),
      // Save the user on local storage
      switchMap((resp: any) => {
        user.id = resp.id;
        user.setCreatedAt(resp.createdAt);
        // first time user creation the updated at will be same as created at date
        user.setUpdatedAt(resp.createdAt);

        // Make a clone of the users and assign the new user
        const localUsers = this.users.slice();
        // Insert new user
        localUsers.push(user);

        // Save on local storage
        return this.localStorageService.setItem('users', localUsers);
      }),
      // Return the user just created
      map(() => user)
    );
  }

  /**
   * Delete a user from local storage
   *
   * @param userToDelete User to Delete
   * @returns {Observable<boolean>}
   *          To subscribe and know it finish. In case the email already exits
   *          will throw an observable error
   */
  deleteUser(userToDelete: LocalUser): Observable<boolean> {
    this.imLoading();

    this.http.delete(`${this.usersEndpoint}${userToDelete.id}`, {}).pipe(
      // give it 3seconds to make the operation
      timeout(3000),
      // Retry the operation 3 times on error
      retry(3),
      // Remove the user on local storage
      switchMap(() => this.removeUserOnLocalStorage(userToDelete)))
      .subscribe(
        () => {
          this.loadingDone();
        },
        (err) => this.handleConnectionError(err)
      );

    return this.isLoading();
  }

  /**
   * Update a user from local storage
   *
   * @param userToUpdate User to Delete
   *
   * @returns {Observable<boolean>}
   *          To subscribe and know it finish. In case the email already exits
   *          will throw an observable error
   */
  updateUser(userToUpdate: LocalUser): Observable<boolean> {
    this.imLoading();

    this.http.put(this.usersEndpoint, {}).pipe(
      // give it 3seconds to make the operation
      timeout(3000),
      // Retry the operation 3 times on error
      retry(3),
      // Save the user on local storage
      switchMap((resp: any) => {
        // Update updated at date
        userToUpdate.setUpdatedAt(resp.updatedAt);

        return this.updateOnLocalStorage(userToUpdate);
      }))
      .subscribe(
        () => {
          this.loadingDone();
        },
        // On error
        (err) => this.handleConnectionError(err)
      );

    return this.isLoading();
  }

  /**
   * Load the users form the local storage and assign them to
   * our array of users
   */
  loadLocalUsers(): Observable<LocalUser[]> {
    // Load the stored users
    return this.localStorageService.getItem<Array<LocalUser>>('users').pipe(
      // Return only one user of the users gotten or an empty array if there is any user
      switchMap((localUsers: Array<LocalUser>) => localUsers ? localUsers : []),
      // Transform the user from simple json to our model
      map((localUser: LocalUser) => new LocalUser(localUser)),
      // Collect all the users in an array
      toArray());
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
   * Update on local storage the given user
   * Try to update it, if goes well push in the array
   *
   * @param userUpdated The user to update in the local storage
   */
  private updateOnLocalStorage(userUpdated: LocalUser): Observable<boolean> {

    // Get the index of the user to be edited
    const index = this.users.findIndex((user: LocalUser) => user.id === userUpdated.id);

    this.users[index] = userUpdated;

    // Update on local storage
    return this.localStorageService.setItem('users', this.users);
  }

  /**
   * Delete an user form the DB
   *
   * @param userToDelete User to be deleted
   */
  private removeUserOnLocalStorage(userToDelete: LocalUser): Observable<any> {
    // Make a clone of the users and remove the user
    const localUsers = this.users.filter((user: LocalUser) => user.id !== userToDelete.id);

    // Save the array with the user removed on local storage
    return this.localStorageService.setItem('users', localUsers).pipe(
      // If everything goes well assign the array of users with the user removed to the original array
      tap(() => {
        // Quit all the users
        this.users.splice(0, this.users.length);
        // Push the new ones
        this.users.push(...localUsers);
      }));
  }

  /**
   * What to do when a connection error happen
   *
   * @param err The error triggered
   */
  private handleConnectionError(err: any) {
    this.loading.error(err);
    this.loadingDone();
  }
}
