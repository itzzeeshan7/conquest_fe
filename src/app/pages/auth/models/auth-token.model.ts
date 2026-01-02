export class AuthToken {
  public token: string;

  constructor(json: any) {
    this.token = json;
  }
}
