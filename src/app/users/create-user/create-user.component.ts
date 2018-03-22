import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
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
   * User Data
   */
  age: string | number;
  birthDate: Date;

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>) {

    // Set the start dates
    this.startDate = new Date();
    // Rest 30 years to today
    this.startDate.setFullYear(this.startDate.getFullYear() - 30);

    this.maxDate = new Date();
    // Rest 2 years to today, a two years baby can use this ;)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 2);

    this.age = '';
  }

  ngOnInit() {
  }

  /**
   * The birth date was change so calculate the age
   */
  birthDateChanged() {
    // Time difference
    const timeDiff = Math.abs(new Date().getTime() - this.birthDate.getTime());
    // Days difference
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Calculate the age
    this.age = Math.trunc(diffDays / 365);
  }

  /**
   * Just close the modal because the user doesn't want to do anything
   */
  closeModal() {
    this.dialogRef.close();
  }

}
