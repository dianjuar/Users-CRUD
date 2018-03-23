import { Injectable } from '@angular/core';
import { ApiUser } from './api-user.model';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';

import { LoadingService } from '../../shared/loading-service';


@Injectable()
export class ApiUserService extends LoadingService implements Pagination {

  /**
   * The API users list
   */
  users: Array<ApiUser>;

  /**
   * Pagination information
   */
  page: number;
  perPage: number;
  total: number;
  totalPages: number;

  /**
   * The endpoint to get the users
   */
  private readonly getUsersEndPoint = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
    super();

    // Init the users array
    this.users = new Array<ApiUser>();

    // Get always the 1st page
    this.page = 1;

    /**
     * Get the users
     */
    this.getUsers();
  }

  /**
   * Fetch the users from the API
   */
  getUsers() {
    // indicate that we are loading
    this.imLoading();

    this.http.get(this.getUsersEndPoint + '?page=' + this.page)
      // Assign pagination properties
      .do((resp: any) => {
        this.perPage = resp.per_page;
        this.total = resp.total;
        this.totalPages = resp.total_pages;
      })
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
          // Quit all the users
          this.users.splice(0, this.users.length);
          // Push the new ones
          this.users.push(...userList);

          // The wait is finish
          this.loadingDone();
          // console.log(this.users);
        }
      );
  }

  /**
   * Get the users by page
   *
   * @param index Index to fetch
   * @returns {Observable<boolean>} To subscribe and know it loads
   */
  pageChange(index: number): Observable<boolean> {
    this.page = index;

    this.getUsers();

    return this.isLoading();
  }
}

/**
 * Interface to store all the pagination information
 */
interface Pagination {
  /**
   * The current viewed page
   */
  page: number;

  /**
   * How many items per page
   */
  perPage: number;

  /**
   * Total items
   */
  total: number;

  /**
   * How many pages are
   */
  totalPages: number;
}
