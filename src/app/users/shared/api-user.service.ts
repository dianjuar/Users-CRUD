import { Injectable } from '@angular/core';
import { ApiUser } from './api-user.model';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';


@Injectable()
export class ApiUserService {

  /**
   * The API users list
   */
  users: Array<ApiUser>;

  /**
   * The endpoint to get the users
   */
  readonly getUsersEndPoint = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
    this.users = new Array<ApiUser>();

    /**
     * Get the users
     */
    this.getUsers();
  }

  /**
   * Fetch the users from the API
   */
  getUsers() {
    this.http.get(this.getUsersEndPoint)
      // Return only the data
      .map((resp: any) => resp.data)
      // Return only one user
      .switchMap((users: Array<any>) => users)
      // Transform the user from simple json to our model
      .map((user: any) => new ApiUser(user.id, user.first_name, user.last_name, user.avatar))
      // Collect all the users in an array
      .reduce((list: Array<ApiUser>, user: ApiUser): Array<ApiUser> => {
        list.push(user);
        return list;
      }, new Array<ApiUser>())
      // TODO error handling cases
      // Assign the user list to our list
      .subscribe(
        (userList: Array<ApiUser>) => {
          this.users.push(...userList);
          // console.log(this.users);
        }
      );
  }

}
