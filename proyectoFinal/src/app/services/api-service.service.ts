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
  
  constructor(private http: HttpClient) { }

  getPerfil(): Observable<any>{
    return this.http.get<perfil>('api/profile/traer');
  }

  getExperiencia(): Observable<any>{
    return this.http.get<experiencia>('api/experience/traer');
  }

  getEducacion(): Observable<any>{
    return this.http.get<educacion>('api/education/traer');
  }

  getProjects(): Observable<any>{
    return this.http.get<proyectos>('api/project/traer');
  }

  getHabilidad(): Observable<any>{
    return this.http.get<habilidad>('api/skill/traer');
  }

  getUnPerfil(id: number):Observable<perfil>{
    return this.http.get<perfil>(`api/profile/traer/${id}`);
  }

  getUnaExp(id: number): Observable<any>{
    return this.http.get<experiencia>(`api/experience/traer/${id}`);
  }

  getUnaEduc(id: number): Observable<any>{
    return this.http.get<educacion>(`api/education/traer/${id}`)
  }

  getUnProj(id: number): Observable<any>{
    return this.http.get<proyectos>(`api/project/traer/${id}`);
  }

  deleteExp(id: number){
    return this.http.delete(`api/experience/borrar/${id}`);
  }

  deleteEduc(id: number){
    return this.http.delete(`api/education/borrar/${id}`);
  }

  deleteProj(id: number){
    return this.http.delete(`api/project/borrar/${id}`);
  }

  putPerf(id: number, perfil: perfil): Observable<any>{
    const url = `api/profile/editar/${id}`
    return this.http.put<perfil>(url, perfil, httpOptions);
  }

  putExp(id: number, experiencia: experiencia): Observable<any>{
    const url = `api/experience/editar/${id}`;
    return this.http.put<experiencia>(url, experiencia, httpOptions);
  }

  putEduc(id: number, educacion: educacion): Observable<any>{
    const url = `api/education/editar/${id}`
    return this.http.put<educacion>(url, educacion, httpOptions);
  }

  putProj(id: number, proyecto: proyectos){
    const url = `api/project/editar/${id}`
    return this.http.put<proyectos>(url, proyecto, httpOptions);
  }

  createExp(experiencia: experiencia):Observable<any>{
    const url = 'api/experience/guardar'
    return this.http.post<experiencia>(url, experiencia);
  }

  createEduc(educacion: educacion):Observable<any>{
    const url = 'api/education/guardar'
    return this.http.post<educacion>(url, educacion);
  }

  createProy(proyecto: proyectos):Observable<any>{
    const url = 'api/project/guardar'
    return this.http.post<proyectos>(url, proyecto);
  }

  crearHabilidad(habilidad: habilidad):Observable<any>{
    const url = 'api/skill/guardar'
    return this.http.post<habilidad>(url, habilidad);
  }
}
