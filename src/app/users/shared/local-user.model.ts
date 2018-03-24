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

  /**
   * The date that the user was created
   */
  createdAt: Date;

  /**
   * The last updated date
   */
  updatedAt?: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: Date | string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    // Set the ID or generate a new one
    this.id = id;

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;

    // Set Dates
    this.birthDate = this.transformDate(birthDate);
    this.createdAt = this.transformDate(createdAt);
    this.updatedAt = this.transformDate(updatedAt);

    // Calculate the age
    this.setAge();
  }

  /**
   * Construct an empty local user object
   *
   * @returns {LocalUser} the empty user
   */
  static initEmptyUser(): LocalUser {
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
   * Set the update at date
   *
   * @param updatedDate The date that was updated
   */
  setUpdatedAt(updatedDate: Date | string): void {
    this.updatedAt = this.transformDate(updatedDate);
  }

  /**
   * Set the created at date
   *
   * @param createdAt The date that was updated
   */
  setCreatedAt(createdAt: Date | string): void {
    this.createdAt = this.transformDate(createdAt);
  }

  /**
   * Get the full name of the user
   * @returns {string} The full name of the user
   * @example "Diego Juliao"
   */
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * Calculate the age an put it to the attribute
   */
  setAge() {
    if (!!this.birthDate) {
      this.age = LocalUser.calculateYears(this.birthDate);
    }
  }


  /**
   * Transform a date if it comes as a string
   *
   * @param date the date to transform
   * @returns {Date} the string transformed as date if is a string or a Date... if not will return null
   */
  private transformDate(date: Date | string | undefined): Date | null {
    if (date instanceof Date) {
      return date as Date;
    } else if (typeof date === 'string') {
      return new Date(date as string);
    }

    return null;
  }

}
