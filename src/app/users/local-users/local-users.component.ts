import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTable, MatDialog, MatSnackBar } from '@angular/material';

import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';

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
  table: MatTable<LocalUser>;
  @ViewChild('table') set setNewTable(newTable: MatTable<LocalUser>) {
    this.table = newTable;
    this.updateRows();
  }

  /**
   * Reference for user list that is on the LocalUserService
   */
  users: Array<LocalUser>;

  /**
   * To indicate if the component is loading
   */
  loading: boolean;

  /**
   * The data source of the table
   */
  dataSource: MatTableDataSource<LocalUser>;

  /**
   * The columns of the table
   */
  readonly displayedColumns = [
    'fullName',
    'email',
    'phone',
    'birthDate',
    'age',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  constructor(
    private localUserService: LocalUserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // We are loading
    this.loading = true;

    this.localUserService.isLoading()
      .subscribe(() => {
        // Update the rows and indicate that the load time finish

        // Render the table if there is something to show
        if (this.users.length !== 0) {
          this.updateRows();
        }

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

  /**
   * Update the table rows
   */
  updateRows() {
    if (this.table) {
      this.table.renderRows();
    }
  }

  /**
   * Delete a selected user
   * @param user
   */
  deleteUser(user: LocalUser) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: user
    });

    // what to do if the user says "YES I WANT DELETE"
    const deleteUserFun = (userToDelete: LocalUser) => {
      // If when closing we receive a userID means the the users accepts
      if (userToDelete) {
        // Indicate that we are loading
        this.loading = true;

        // Delete user
        this.localUserService.deleteUser(userToDelete)
          // On success update table and display a notification
          .subscribe(
            // Completed successfully
            () => {
              this.loading = false;
              this.updateRows();
              // Show a snack bar to indicate the operation
              this.snackBar.open('User Deleted Successfully', 'GOT IT!', {
                duration: 2000,
              });
            },
            // On error
            (err) => {
              this.loading = false;
              // Indicate the error
              const snackRef = this.snackBar.open('Connection Error', 'RETRY', {
                duration: 10000
              });

              // If the user clicks on retry call the function again to make the request
              snackRef.onAction()
                .subscribe(
                  () => {
                    // Call itself to repeat the process
                    deleteUserFun(userToDelete);
                  }
                );
            }
          );
      }
    };

    // When the dialog is closed it receive the user response
    dialogRef.afterClosed().subscribe(
      deleteUserFun
    );
  }

  /**
   * Update the user
   * @param user
   */
  editUser(user: LocalUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '50%',
      maxWidth: '500px',
      minWidth: '344px',
      data: Object.assign(LocalUser.initEmptyUser(), user) as LocalUser
    });

    // When the dialog closes, update the rows, probably a new user was edited
    dialogRef.afterClosed().subscribe(
      () => this.updateRows()
    );
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
