import { APP_INITIALIZER, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  constructor() { }

  init(): Promise<void> {
    return new Promise((resolve: any) => {
      console.log(`I'm running`);
      resolve();
    });
  }

  public static appInitializer(intlService: IntlService) {
    return (): Promise<void> => {
      return intlService.init();
    }
  }
}

export const intlProvider = {
  provide: APP_INITIALIZER, // L'application démarre
  useFactory: IntlService.appInitializer,
  deps: [
    IntlService
  ],
  multi: true
}
