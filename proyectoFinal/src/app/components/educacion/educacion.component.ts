import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { educacion } from 'src/app/Interfaces/iEducacion';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons/faDeleteLeft'
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  autenticado(){
    return this.authService.UsuarioAutenticado;
  }

  delete(id: any){
    var res = window.confirm("Desea eliminar?")
    if(res){
      this.deleteEd.emit(id)
    }
  }

}
