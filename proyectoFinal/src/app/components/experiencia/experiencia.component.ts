import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { experiencia } from 'src/app/Interfaces/iExperiencia';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Input() experiencia: experiencia = {}
  @Output() deleteExp = new EventEmitter();
  del = faTrash;
  edit = faPen;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    this.deleteExp.emit(id);
  }

}
