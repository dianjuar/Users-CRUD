import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTable } from '@angular/material';

import { LocalUserService } from '../shared/local-user.service';
import { LocalUser } from '../shared/local-user.model';

@Component({
  selector: 'app-local-users',
  templateUrl: './local-users.component.html',
  styleUrls: ['./local-users.component.scss']
})
export class LocalUsersComponent implements OnInit {

  /**
   * Reference to the table
   */
  @ViewChild('table') private table: MatTable<LocalUser>;

  /**
   * Reference for user list that is on the LocalUserService
   */
  users: Array<LocalUser>;

  /**
   * To indicate if the component is loading
   */
  loading;

  /**
   * The columns of the table
   */
  readonly displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'birthDate',
    'age',
    'actions',
  ];

  constructor(
    private localUserService: LocalUserService
  ) {
    // We are loading
    this.loading = true;

    this.localUserService.isLoading()
      .subscribe(() => {
        // Update the rows and indicate that the load time finish
        this.updateRows();
        this.loading = false;
      });
  }

  ngOnInit() {
    this.users = this.localUserService.users;
  }

  updateRows() {
    this.table.renderRows();
  }
}
