import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { educacion } from 'src/app/Interfaces/iEducacion';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() educacion: educacion = {}
  @Output() deleteEd = new EventEmitter();

  del = faTrash;
  edit = faPen;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    this.deleteEd.emit(id)
  }

}
