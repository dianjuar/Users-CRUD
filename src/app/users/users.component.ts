import { Component, OnInit } from '@angular/core';

import { CreateUserComponent } from './create-user/create-user.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogCreateLocalUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '50%',
      maxWidth: '500px',
      minWidth: '344px'
    });
  }

}
