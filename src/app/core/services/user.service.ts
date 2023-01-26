import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { BehaviorSubject, Observable, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: UserModel | null = null;
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  // public hasUser(): boolean {
  //   return this._user != null;
  // }

  public signin(userForm: any): void {
    this._user = <UserModel> {
      username: userForm.username,
      password: btoa(`${userForm.username}:${userForm.password}`)
    }
    console.log("User service: signin:", this._user)
    this.hasUser$.next(true)
  }

  public signout(): void {
    console.log("User service: signout:", this._user?.username)
    this._user = null;
    this.hasUser$.next(false)
  }

  public get user(): UserModel | null {
    return this._user;
  }
}
