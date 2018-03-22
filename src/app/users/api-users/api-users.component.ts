import { Component, OnInit } from '@angular/core';

import { ApiUserService } from '../shared/api-user.service';
import { ApiUser } from '../shared/api-user.model';

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

  constructor(private apiUsers: ApiUserService) {
  }

  ngOnInit() {
    this.users = this.apiUsers.users;
  }

}
