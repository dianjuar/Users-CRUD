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
   * The data source of the table
   */
  dataSource: MatTableDataSource<LocalUser>;

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
    // Init the data source
    this.dataSource = new MatTableDataSource(this.users);

    // Change the default filtering to filter only by email
    this.dataSource.filterPredicate = this.filterByEmail;
  }

  /**
   * Capture each time the user types to filter the table with
   * that criteria
   *
   * @param emailToSearch The email to search for
   */
  emailCriteriaChanged(emailToSearch: string) {
    emailToSearch = emailToSearch.trim(); // Remove whitespace
    emailToSearch = emailToSearch.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = emailToSearch;
  }

  updateRows() {
    this.table.renderRows();
  }

  /**
   * Function to overwrite the custom filtering Material Table
   *
   * @param data localUser to filter
   * @param filter The string to search for
   */
  private filterByEmail(data: LocalUser, filter: string): boolean {
    return data.email.search(filter) !== -1;
  }
}
