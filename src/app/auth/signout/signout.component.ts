import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public signout(): void {
    this._userService.signout();
  }

}
