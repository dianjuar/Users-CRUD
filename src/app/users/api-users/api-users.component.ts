import { Component, OnInit } from '@angular/core';

import { ApiUserService } from '../shared/api-user.service';
import { ApiUser } from '../shared/api-user.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-api-users',
  templateUrl: './api-users.component.html',
  styleUrls: ['./api-users.component.scss']
})
export class ApiUsersComponent implements OnInit {

  /**
   * Reference for user list that is on the ApiUserService
   */
  users: Array<ApiUser>;

  /**
   * To indicate if the component is loading
   */
  loading;

  constructor(public apiUsers: ApiUserService) {
    // We are loading
    this.loading = true;

    this.apiUsers.isLoading()
      .subscribe(() => this.loading = false);
  }

  ngOnInit() {
    this.users = this.apiUsers.users;
  }

  /**
   * Catch the page change event of the paginator
   *
   * @param page The information about the current page
   */
  pageChanged(page: PageEvent) {
    this.loading = true;

    // Fetch the users for the page that we are viewing
    this.apiUsers.pageChange(page.pageIndex + 1)
      .subscribe(() => this.loading = false);
  }

}
