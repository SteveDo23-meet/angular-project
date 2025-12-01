export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class UserModel implements User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}
