import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<any>;
  autehticado: boolean = false;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || 'null'));
  }
  

  login(usernameOrEmail: string, password: string): Observable<any>{
    return this.http.post("api/auth/login", {"usernameOrEmail": usernameOrEmail , "password": password}).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);  
      console.log(this.currentUserSubject.value);
      
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
