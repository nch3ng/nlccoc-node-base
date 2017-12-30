export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
  }
}

export class RegUser extends User {
  confirmedPassword: string;
}