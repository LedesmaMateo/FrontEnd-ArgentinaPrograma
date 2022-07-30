import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { educacion } from 'src/app/Interfaces/iEducacion';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons/faDeleteLeft'

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() educacion: educacion = {}
  @Output() deleteEd = new EventEmitter();
  del = faDeleteLeft;
  edit = faPenToSquare;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    var res = window.confirm("Desea eliminar?")
    if(res){
      this.deleteEd.emit(id)
    }
  }

}
