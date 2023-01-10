import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  private _language: string = '';
  private _translateService!: TranslateService;

  constructor() { };

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
    this._switchLanguage();
  }

  init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise((resolve: any) => {
      injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null) // If TOKEN was not provided
      ).then(() => { // Angular says i'm okay with my own resources, do what u need
        const userLanguage: string = window.navigator.language.split('-')[0]; // fr-FR => fr | FR => fr

        this._language = /(fr|en|de|it|es)/gi.test(userLanguage) ? userLanguage : 'fr';

        this._translateService = translateService;

        this._switchLanguage().subscribe(() => {
          console.log(`Location was loaded for ${this._language}`);
          resolve();
        })

      })

    });

  }

  private _switchLanguage(): Observable<any> {
    return this._translateService.use(this._language)
  }

  public static appInitializer(
    intlService: IntlService,
    translateService: TranslateService,
    injector: Injector
  ) {
    return (): Promise<void> => {
      return intlService.init(translateService, injector);
    }
  }

  public static httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(
      httpClient,
      './assets/i18n/',
      '.json'
    );
  }

}

export const intlProvider = {
  provide: APP_INITIALIZER, // L'application démarre
  useFactory: IntlService.appInitializer,
  deps: [
    IntlService,
    TranslateService,
    Injector
  ],
  multi: true
}
