import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroupDirective, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent, MatSnackBar, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';

import { LocalUser } from '../shared/local-user.model';
import { LocalUserService } from '../shared/local-user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

/**
 * Contains all the Form Controls Validators
 */
class FormControlValidators {
  /**
   * Control the emails errors
   */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /**
   * Control the names errors
   */
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.*(.*\w){2,}.*$/),
  ]);

  /**
   * Control the names errors
   */
  secondNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.*(.*\w){2,}.*$/),
  ]);

  /**
   * Control the names errors
   */
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{9,15}$/),
  ]);

  /**
   * Match errors
   */
  matcher = new MyErrorStateMatcher();
}

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends FormControlValidators implements OnInit {

  /**
   * Indicate whether the modal is editing or creating a user
   */
  onEdit: boolean;

  /**
   * Reference to the form
   */
  @ViewChild('userForm') userForm: NgForm;

  /**
   * The start date of the date picker
   * UX improvident, the user will be more near to its birth date
   */
  startDate: Date;

  /**
   * The max date that an user can put
   * UX improvident, has no sense on a birth date put future dates
   */
  maxDate: Date;

  /**
   * Representation of the user
   */
  user: LocalUser;

  /**
   * To indicate if the component is loading
   */
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userToEdit: any,
    private snackBar: MatSnackBar,
    private localUserService: LocalUserService
  ) {
    super();

    // We are loading
    this.loading = false;

    // Set the start dates
    this.startDate = new Date();
    // Rest 30 years to today
    this.startDate.setFullYear(this.startDate.getFullYear() - 30);

    this.maxDate = new Date();
    // Rest 2 years to today, a two years baby can use this ;)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 2);

    // If a user to edit is passed, set it as a current user
    if (!this.userToEdit) {
      this.onEdit = false;
      this.user = LocalUser.initEmptyUser();
    } else {
      this.user = this.userToEdit;
      this.onEdit = true;
    }
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

  /**
   * Catch the event of the form submit and go to save the user
   * after that show a message
   */
  onSubmit() {
    // Indicate that we are loading
    this.loading = true;

    // If we are editing or creating
    if (this.onEdit) {
      this.updateUser();
    } else {
      this.saveNewUser();
    }
  }

  /**
   * Save the new user information
   */
  private saveNewUser() {
    this.localUserService.saveUser(this.user)
      // Close the modal on success
      .switchMap(() => this.closeModal())
      // When the modal is closed....
      .subscribe(
        // next
        () => {
          // Show a snack bar to indicate the operation
          this.snackBar.open('User Saved Successfully', 'GOT IT!', {
            duration: 2000,
          });
        },
        // error
        (err: string) => {
          console.log('error', err);
          this.loading = false;
        },
        // complete
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Update the current edited user
   */
  private updateUser() {
    this.localUserService.updateUser(this.user)
      // Close the modal on success
      .switchMap(() => this.closeModal())
      // When the modal is closed....
      .subscribe(
        // next
        () => {
          // Show a snack bar to indicate the operation
          this.snackBar.open('User Updated Successfully', 'GOT IT!', {
            duration: 2000,
          });
        },
        // error
        (err: string) => {
          console.log('error', err);
          this.loading = false;
        },
        // complete
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Trigger the submit of the new user form
   */
  submitForm() {
    // console.log(this.userForm);
    this.userForm.ngSubmit.next();
  }
}
