import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor is here with request:", req);
    // TODO1: check if request has to be secured or not
    // TODO2: retrieve current User if not logged
    const user = <UserModel> {
      username: "user",
      password: btoa("user:password")
    };
    const newReq = req.clone({
      headers: new HttpHeaders(`Authorization: Basic ${user.password}`)
    });
    console.log("Request with authorization:", newReq);
    return next.handle(newReq);
  }
}

export const authInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
}