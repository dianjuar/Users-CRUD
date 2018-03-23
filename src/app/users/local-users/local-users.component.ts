import { Component, OnInit } from '@angular/core';

import { LocalUserService } from '../shared/local-user.service';
import { LocalUser } from '../shared/local-user.model';

@Component({
  selector: 'app-local-users',
  templateUrl: './local-users.component.html',
  styleUrls: ['./local-users.component.scss']
})
export class LocalUsersComponent implements OnInit {

  /**
   * Reference for user list that is on the LocalUserService
   */
  users: Array<LocalUser>;

  /**
   * To indicate if the component is loading
   */
  loading;


  constructor(
    private localUserService: LocalUserService
  ) {
    // We are loading
    this.loading = true;

    this.localUserService.isLoading()
      .subscribe(() => this.loading = false);
  }

  ngOnInit() {
    this.users = this.localUserService.users;
  }

}
