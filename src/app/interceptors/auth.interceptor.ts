import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { OmniparkingStore } from '@app/store/omniparking.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login')) {
    return next(req);
  }
  const authService = inject(AuthService);
  const omniparkingStore = inject(OmniparkingStore);

  const token = omniparkingStore.token()

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    })
  };

  const clonedReq = req.clone(httpOptions);

  return next(clonedReq);
};
