import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material';
import { NgForm } from '@angular/forms';

import { LocalUser } from '../shared/local-user.model';
import { LocalUserService } from '../shared/local-user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private localUserService: LocalUserService
  ) {

    // Set the start dates
    this.startDate = new Date();
    // Rest 30 years to today
    this.startDate.setFullYear(this.startDate.getFullYear() - 30);

    this.maxDate = new Date();
    // Rest 2 years to today, a two years baby can use this ;)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 2);

    this.user = LocalUser.initEmptyUser();
  }

  ngOnInit() {
  }

  /**
   * Just close the modal because the user doesn't want to do anything
   */
  closeModal() {
    this.dialogRef.close();
  }

  /**
   * Catch the event of the form submit
   */
  onSubmit() {
    this.localUserService.saveUser(this.user);
  }

  /**
   * Trigger the submit of the new user form
   */
  submitForm() {
    // console.log(this.userForm);
    this.userForm.ngSubmit.next();
  }

}
