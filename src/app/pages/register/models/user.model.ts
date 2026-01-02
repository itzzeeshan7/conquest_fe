export class UserRoles {
  constructor(
    public id: number,
    public name: string,
    public checked?: boolean,
  ) {}
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public receiveNotification: boolean,
    public password?: string,
    public phone?: string,
    public photo?: string,
    public id?: number,
    public roles?: UserRoles[],
    public edit?: boolean,
    public newUser?: boolean,
  ) {}
}
