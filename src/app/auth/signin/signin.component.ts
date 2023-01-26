import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
    this.signinForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public onSubmit(): void {
    console.log("Sign In", this.signinForm.value)
    this._userService.signin(this.signinForm.value)    
  }
}
