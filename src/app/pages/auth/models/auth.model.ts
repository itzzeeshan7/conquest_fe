export class Auth {
  public email: string;
  public password: string;
  public remember?: boolean;

  constructor(json: any) {
    this.email = json.email;
    this.password = json.password;
    this.remember = json.remember;
  }
}
