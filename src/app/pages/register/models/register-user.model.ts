export class RegisterUser {
  public name: string;
  public email: string;
  public password: string;
  public phone: string;

  constructor(json: any) {
    this.name = json.name;
    this.email = json.email;
    this.password = json.password;
    this.phone = json.phone;
  }
}
