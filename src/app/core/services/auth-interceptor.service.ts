import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor is here with request:", req);
    // TODO: check if request has to be secured or not
    const newReq = req.clone({
      headers: new HttpHeaders('Authorization: Basic dXNlcjpwYXNzd29yZA==')
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