export class UserModel {
    private _username: string = '';
    private _password: string = '';

    get username() {
      return this._username
    }
    
    set username(val: string) {
      this._username = val
    }
    
    get password() {
      return this._password
    }
    
    set password(val: string) {
      this._password = val
    }
}
