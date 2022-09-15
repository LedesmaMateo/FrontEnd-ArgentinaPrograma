import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  @Input() perfil: any = {}
  edad: number = 0;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.calcularEdad();
  }

  autenticado(){
    return this.authService.UsuarioAutenticado;
  }

  calcularEdad(){
    var hoy = new Date();
    var cumpleanos = new Date(this.perfil.fecha_nacimiento);
    this.edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        this.edad--;
    }
  }

}
