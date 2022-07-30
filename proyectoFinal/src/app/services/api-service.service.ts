import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { perfil } from '../Interfaces/iPerfil';
import { Observable } from 'rxjs';
import { experiencia } from '../Interfaces/iExperiencia';
import { educacion } from '../Interfaces/iEducacion';
import { proyectos } from '../Interfaces/iProyectos';
import { habilidad } from '../Interfaces/iHabilidad';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url = 'https://backend-argprograma.herokuapp.com/api'

  constructor(private http: HttpClient) { }

  getPerfil(): Observable<any>{
    return this.http.get<perfil>(`${this.url}/profile/traer`);
  }

  getExperiencia(): Observable<any>{
    return this.http.get<experiencia>(`${this.url}/experience/traer`);
  }

  getEducacion(): Observable<any>{
    return this.http.get<educacion>(`${this.url}/education/traer`);
  }

  getProjects(): Observable<any>{
    return this.http.get<proyectos>(`${this.url}/project/traer`);
  }

  getHabilidad(): Observable<any>{
    return this.http.get<habilidad>(`${this.url}/skill/traer`);
  }

  getUnPerfil(id: number):Observable<perfil>{
    return this.http.get<perfil>(`${this.url}/profile/traer/${id}`);
  }

  getUnaExp(id: number): Observable<any>{
    return this.http.get<experiencia>(`${this.url}/experience/traer/${id}`);
  }

  getUnaEduc(id: number): Observable<any>{
    return this.http.get<educacion>(`${this.url}/education/traer/${id}`)
  }

  getUnProj(id: number): Observable<any>{
    return this.http.get<proyectos>(`${this.url}/project/traer/${id}`);
  }

  deleteExp(id: number){
    return this.http.delete(`${this.url}/experience/borrar/${id}`);
  }

  deleteEduc(id: number){
    return this.http.delete(`${this.url}/education/borrar/${id}`);
  }

  deleteProj(id: number){
    return this.http.delete(`${this.url}/project/borrar/${id}`);
  }

  putPerf(id: number, perfil: perfil): Observable<any>{
    const url = `${this.url}/profile/editar/${id}`
    return this.http.put<perfil>(url, perfil, httpOptions);
  }

  putExp(id: number, experiencia: experiencia): Observable<any>{
    const url = `${this.url}/experience/editar/${id}`;
    return this.http.put<experiencia>(url, experiencia, httpOptions);
  }

  putEduc(id: number, educacion: educacion): Observable<any>{
    const url = `${this.url}/education/editar/${id}`
    return this.http.put<educacion>(url, educacion, httpOptions);
  }

  putProj(id: number, proyecto: proyectos){
    const url = `${this.url}/project/editar/${id}`
    return this.http.put<proyectos>(url, proyecto, httpOptions);
  }

  createExp(experiencia: experiencia):Observable<any>{
    const url = `${this.url}/experience/guardar`
    return this.http.post<experiencia>(url, experiencia);
  }

  createEduc(educacion: educacion):Observable<any>{
    const url = `${this.url}/education/guardar`
    return this.http.post<educacion>(url, educacion);
  }

  createProy(proyecto: proyectos):Observable<any>{
    const url = `${this.url}/project/guardar`
    return this.http.post<proyectos>(url, proyecto);
  }

  crearHabilidad(habilidad: habilidad):Observable<any>{
    const url = `${this.url}/skill/guardar`
    return this.http.post<habilidad>(url, habilidad);
  }
}
