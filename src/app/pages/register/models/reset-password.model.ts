export class ResetPassword {
  public code: string;
  public password: string;
  public passwordConfirmation: string;

  constructor(json: any) {
    this.code = json.code;
    this.password = json.password;
    this.passwordConfirmation = json.passwordConfirm;
  }
}
