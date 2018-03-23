import { Component, OnInit, ViewChild } from '@angular/core';

import { CreateUserComponent } from './create-user/create-user.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalUsersComponent } from './local-users/local-users.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  /**
   * Reference to the component Local Users
   */
  @ViewChild('localUsers') private localUsersComponent: LocalUsersComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogCreateLocalUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '50%',
      maxWidth: '500px',
      minWidth: '344px'
    });

    // When the dialog closes, update the rows, probably a new user was created
    dialogRef.afterClosed().subscribe(
      () => this.localUsersComponent.updateRows()
    );
  }

}
