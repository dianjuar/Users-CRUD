import { Component, OnInit } from '@angular/core';

import { ApiUserService } from '../shared/api-user.service';

@Component({
  selector: 'app-api-users',
  templateUrl: './api-users.component.html',
  styleUrls: ['./api-users.component.scss']
})
export class ApiUsersComponent implements OnInit {

  constructor(private apiUsers: ApiUserService) {
  }

  ngOnInit() {
  }

}
