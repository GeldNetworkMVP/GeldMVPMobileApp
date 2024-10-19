import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { from, lastValueFrom, Observable, switchMap, tap } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  authenticationService = inject(AuthenticationService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const excludedUrls = [
      '/appuser/save',
      '/userexists',
      '/usersignin',
      '/v1/current.json',
    ]; // URLs to exclude from prefix and token

    // if your getAuthToken() function declared as "async getAuthToken() {}"
    const authToken = (await Preferences.get({ key: 'token' })).value;

    // if your getAuthToken() function declared to return an observable then you can use
    // const authToken = await lastValueFrom(this.auth.getAuthToken())

    const urlObj = new URL(req.url);

    const origin = urlObj.origin;
    const pathname = urlObj.pathname;

    // Check if the request URL starts with "/api/" and is not excluded
    const shouldAddPrefix = !excludedUrls.some((url) =>
      pathname.startsWith(url)
    );

    let authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    if (shouldAddPrefix) {
      authReq = authReq.clone({ url: `${origin}/api${pathname}` });
    }

    console.log('authReq', authReq);

    return lastValueFrom(next.handle(authReq));
  }
}
