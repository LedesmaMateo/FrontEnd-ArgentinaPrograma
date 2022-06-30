import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<any>;
  autehticado: boolean = false;

  constructor(private http: HttpClient, private routes: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || 'null'));
  }
  

  login(credenciales: any): Observable<any>{
    return this.http.post("api/auth/login", credenciales).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);  
      this.routes.navigate(['/inicio'])
      return data;
    }));
  }

  logOut(){
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }

}
