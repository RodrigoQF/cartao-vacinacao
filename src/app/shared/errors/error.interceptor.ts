import { ErrorHandler, Injectable } from "@angular/core";
import { LoaderService } from "../../service/loader.service";
import { Router } from "@angular/router";
import { Store } from "../utils/util.store";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";

@Injectable()
export class ErrrorInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService, private router: Router, private store: Store) {

    }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // Redireciona para página de erro
        this.router.navigate(['/pagina-erro']);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
