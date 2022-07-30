import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<any>;
  autehticado: string;
  url = 'https://backend-argprograma.herokuapp.com/api'
  private subject = new Subject<any>();

  constructor(private http: HttpClient, private routes: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || 'null'));    
  }
  

  login(credenciales: any): Observable<any>{
    return this.http.post(`${this.url}/auth/login`, credenciales).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
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
