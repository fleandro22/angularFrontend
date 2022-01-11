import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { responseUser, User } from '../../../app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private userDataIn = new BehaviorSubject<any>([]);

  public isLogged:boolean = false;

  constructor(private htttp: HttpClient) { 

    this.validateToken();
  }

  get userLogged(): Observable<any> {
    return this.userDataIn.asObservable();
  }

  login(userData:User): Observable<any> {

    return this.htttp
    .post<responseUser>(`${environment.BASE_URL}/auth`, userData)
    .pipe(
      map( (response:responseUser) => {

        if (response.statusResponse === 'SUCCESS') {
          this.isLogged = true;
          this.saveData(response.data?.nombre, response.data?.cargo);
          this.userDataIn.next({"name":response.data?.nombre,"employment":response.data?.cargo});
        } else {
          this.isLogged = false;
        }

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

  saveData(name:string, employment:string) {
      localStorage.setItem('name', name);
      localStorage.setItem('employment', employment)
  }

  logout(): void{
    localStorage.removeItem('name');
    this.isLogged = false;
  }

  validateToken():void {
    const tokenUser = localStorage.getItem('name');

    if (!tokenUser) {
         this.logout()
    } else {
      this.userDataIn.next([]);
      this.isLogged =  true;
    }
    
  }

  getDataUser(): void{
     const userData:any = {
      "name": localStorage.getItem('name'),
      "employment":  localStorage.getItem('employment')
    }
    return userData;
  }


}
