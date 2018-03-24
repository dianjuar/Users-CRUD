import { Component, OnInit, ViewChild } from '@angular/core';

import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTab } from '@angular/material';
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

  @ViewChild('tab') private tab: MatTabGroup;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogCreateLocalUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '50%',
      maxWidth: '500px',
      minWidth: '344px'
    });

    // When the dialog closes, update the rows, probably a new user was created
    dialogRef.afterClosed()
      .subscribe(
        (dataOnClose: any) => {

          if (dataOnClose) {
            this.localUsersComponent.updateRows();
          }

          if (dataOnClose === 'created') {
            this.tab.selectedIndex = 1;
          }
        }
      );
  }

}
