import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, throwError,  Observable } from 'rxjs';
import { map, timeout, reduce, tap, retry, switchMap, toArray } from 'rxjs/operators';

import { LocalUser } from '../shared/models/local-user.model';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { Store, select } from '@ngrx/store';
import { AppState, selectLocalUsers } from '../../store';
import { DeleteLocalUserSuccessPayloadModel } from '../../store/local-users/actions';


@Injectable()
export class LocalUserService {

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
   * @returns {Observable<boolean>} The observable with created user
   */
  saveUser(user: LocalUser): Observable<boolean> {
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
      })
    );
  }

  /**
   * Delete a user from local storage
   *
   * @param userToDelete User to Delete
   * @returns {Observable<DeleteLocalUserSuccessPayloadModel>}
   */
  deleteUser(userToDelete: LocalUser): Observable<DeleteLocalUserSuccessPayloadModel> {
    let newUsersArray: Array<LocalUser>;

    return this.http.delete(`${this.usersEndpoint}${userToDelete.id}`, {}).pipe(
      // give it 3seconds to make the operation
      timeout(3000),
      // Retry the operation 3 times on error
      retry(3),
      // Remove the user on local storage
      switchMap(() => {
        // Make a clone of the users and remove the user
        newUsersArray = this.users.filter((user: LocalUser) => user.id !== userToDelete.id);

        // Save the array with the user removed on local storage
        return this.localStorageService.setItem('users', newUsersArray);
      }),
      map(() => <DeleteLocalUserSuccessPayloadModel>{
        deletedUser: userToDelete,
        users: newUsersArray
      })
    );
      /* .subscribe(
        () => {
          // this.loadingDone();
        },
        (err) => this.handleConnectionError(err)
      ); */
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
    // this.imLoading();

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
          // this.loadingDone();
        },
        // On error
        (err) => this.handleConnectionError(err)
      );

    return of(true);
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
  doesEmailExists(emailToCheck: string) {
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
   * What to do when a connection error happen
   *
   * @param err The error triggered
   */
  private handleConnectionError(err: any) {
    /* this.loading.error(err);
    this.loadingDone(); */
  }
}
