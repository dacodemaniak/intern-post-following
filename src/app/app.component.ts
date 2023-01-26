import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';
import { IntlService } from './intl/services/intl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // View
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'frontend';
  public hasUser: boolean = false;

  public constructor(
    public intlService: IntlService,
    private _userService: UserService
  ) {}

  ngOnInit(){
    this._userService.hasUser$.subscribe(ok=>{
      console.log("AppComponent has user:", ok)
      this.hasUser = ok
    })
  }

  switchLanguage(language: string): void {
    this.intlService.language = language;
  }

}
