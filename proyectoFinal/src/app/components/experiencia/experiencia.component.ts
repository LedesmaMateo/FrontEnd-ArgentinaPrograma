import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { experiencia } from 'src/app/Interfaces/iExperiencia';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons/faDeleteLeft'

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Input() experiencia: experiencia = {}
  @Output() deleteExp = new EventEmitter();
  del = faDeleteLeft;
  edit = faPenToSquare;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    var res = window.confirm("Desea eliminar?")
    if(res){
      this.deleteExp.emit(id);
    }
  }

}
