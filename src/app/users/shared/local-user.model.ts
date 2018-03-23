import * as shortid from 'shortid';

/**
 *  Model of the local user
 */
export class LocalUser {

  /**
   * A unique identifier
   */
  id: string;

  /**
   * First name of the user
   */
  firstName: string;

  /**
   * last name of the user
   */
  lastName: string;

  /**
   * Email of the user
   */
  email: string;

  /**
   * Phone of the user
   */
  phone: string;

  /**
   * Birth date of the user
   */
  birthDate: Date;

  /**
   * The age of the user
   */
  age: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: Date | string,
    id?: string
  ) {
    // Set the ID or generate a new one
    this.id = id || shortid.generate();

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;

    // If the date is an string transform it to a Date
    if (typeof birthDate === 'string') {
      this.birthDate = new Date(birthDate);
    } else {
      this.birthDate = birthDate;
    }

    // Calculate the age
    this.setAge();
  }

  /**
   * Construct an empty local user object
   *
   * @returns {LocalUser} the empty user
   */
  static initEmptyUser() {
    return new LocalUser('', '', '', '', null);
  }

  /**
   * Given a date calculate the years until now
   *
   * @param birthDate The date to now the years until now
   * @returns {number} The years between the given date an now
   */
  static calculateYears(birthDate: Date) {
    // Time difference
    const timeDiff = Math.abs(new Date().getTime() - birthDate.getTime());
    // Days difference
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Transform the days on years
    return Math.trunc(diffDays / 365);
  }

  /**
   * Calculate the age an put it to the attribute
   */
  setAge() {
    if (!!this.birthDate) {
      this.age = LocalUser.calculateYears(this.birthDate);
    }
  }

}
