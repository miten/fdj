import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {AppService} from "../app.service";
import {AppStore} from "../app.store";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router, private appService: AppService, private store: AppStore) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.appService.errorSubject.next(error);
        this.store.setState({
          ...this.store.state,
          loading: false
        })
        return throwError(error.message);
      })
    )
  }
}
