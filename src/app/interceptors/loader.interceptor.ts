import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { finalize, Observable } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = new LoaderService();
  loadingService.show();  

  return next(req).pipe(
    finalize(() => {
      loadingService.hide(); 
    })
  );
};
