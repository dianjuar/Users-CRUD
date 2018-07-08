import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalUser } from '../../shared/models/local-user.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  /**
   * The user to delete
   */
  userToDelete: LocalUser;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // Get the user to be deleted
    this.userToDelete = data as LocalUser;
  }

  ngOnInit() {
  }

  /**
   * Just close the modal because the user doesn't want to do anything
   *
   * @returns {Observable<any>} An observable to subscribe an know when the dialog is closed
   */
  closeModal(): Observable<any> {
    this.dialogRef.close();

    return this.dialogRef.afterClosed();
  }
}
