import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { proyectos } from 'src/app/Interfaces/iProyectos';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() proyectos: proyectos = {}
  @Output() deletePj = new EventEmitter();
  del = faTrash;
  edit = faPen;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    this.deletePj.emit(id);
  }

}
