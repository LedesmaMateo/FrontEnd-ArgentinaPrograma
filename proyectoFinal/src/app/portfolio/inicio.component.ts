import { Component, OnInit } from '@angular/core';
import { educacion } from '../Interfaces/iEducacion';
import { experiencia } from '../Interfaces/iExperiencia';
import { perfil } from '../Interfaces/iPerfil';
import { proyectos } from '../Interfaces/iProyectos';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  text: string = 'Añadir';
  perfil: perfil[] = [];
  experiencia: experiencia[] = [];
  educacion: educacion[] = [];
  proyecto: proyectos[] = [];

  constructor(private apiService: ApiServiceService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.apiService.getPerfil().subscribe((data) => this.perfil = data);

    this.apiService.getExperiencia().subscribe((data) => this.experiencia = data);

    this.apiService.getEducacion().subscribe((data) => this.educacion = data);

    this.apiService.getProjects().subscribe((data) => this.proyecto = data);
  }

  deleteExp(id: number){
    this.apiService.deleteExp(id).subscribe(() => {
      this.experiencia = this.experiencia.filter((ed:experiencia) => ed.id !== id)
    })
  }

  deleteEd(id:number){
    this.apiService.deleteEduc(id).subscribe(() => {
      this.educacion = this.educacion.filter((ed:educacion) => ed.id !== id)
    })
  }

  deletePj(id: number){
    this.apiService.deleteProj(id).subscribe(() =>{
      this.proyecto = this.proyecto.filter((pj:proyectos) => pj.id !== id);
    })
  }

  autenticado(){
    return this.authService.UsuarioAutenticado;
  }

}
