import { Component } from '@angular/core';
import { IntlService } from './intl/services/intl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // View
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'frontend';

  public constructor(
    public intlService: IntlService
  ) {}

  switchLanguage(language: string): void {
    this.intlService.language = language;
  }

}
