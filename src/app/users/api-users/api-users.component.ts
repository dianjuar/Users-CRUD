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

  constructor(public apiUsers: ApiUserService) {
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
    // Fetch the users for the page that we are viewing
    this.apiUsers.pageChange(page.pageIndex + 1);
  }

}
