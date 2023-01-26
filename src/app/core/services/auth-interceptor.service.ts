import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { off } from 'process';
import { catchError, Observable, throwError } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  private readonly _noSecuredURIs: string[] = [
    './assets/i18n/fr.json',
    './assets/i18n/en.json',
  ]

  constructor(
    private _userService: UserService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor is here with request:", req);

    // not secured request
    if (this._isNotSecuredURI(req.url)) {
      console.log("Interceptor: URI not secured", req.url)
      return next.handle(req)
    }
    
    // no user signed
    if (!this._userService.hasUser$.getValue()) return throwError(() => new Error('No signed user'));
    
    // user signed (perhaps with wrong credentials)
    const newReq = req.clone({
      headers: new HttpHeaders(`Authorization: Basic ${this._userService.user?.password}`)
    });
    console.log("Request with authorization:", newReq);
    return next.handle(newReq)
      .pipe(
        catchError((response:HttpErrorResponse, caught$) => {
          if (response.status == 401) {
            console.log("Interceptor: wrong authentication => signout")
            this._userService.signout()
          } 
          return throwError(() => caught$);
        })
      );
  }

  private _isNotSecuredURI(uri: string): boolean {
    return this._noSecuredURIs.filter(u => u==uri).length > 0
  }
}

export const authInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
}