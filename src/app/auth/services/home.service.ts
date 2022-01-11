import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { responseCompany } from '../../../app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private htttp: HttpClient) {}

  getCompany(nit:string): Observable<any> {

    return this.htttp
      .post<responseCompany>(`${environment.BASE_URL}/company`, {"nit":nit})
      .pipe(
          map( (response:responseCompany) => {
          return response;
          }),
          catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 400 || error.status === 500) {
              return throwError("error endpoint");
          }

          return throwError(error);

          })
          
      );
  }
}
