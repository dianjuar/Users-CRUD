/**
 * Model of API user
 */
export class ApiUser {
  /**
   * The ID of the user
   */
  ID: number;

  /**
   * First Name of the user
   */
  firstName: string;

  /**
   * Last Name of the user
   */
  lastName: string;

  /**
   * The picture or avatar of the user
   * Is an URL
   */
  avatar: string;

  /**
   * The constructor of the ApiUser with all its attributes
   *
   * @param ID
   * @param firstName
   * @param lastName
   * @param avatar
   */
  constructor(
    ID: number,
    firstName: string,
    lastName: string,
    avatar: string) {

    this.ID = ID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
  }

  /**
   * Get the full name of the user
   * @returns {string} The full name of the user
   * @example "Diego Juliao"
   */
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
