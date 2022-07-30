import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { proyectos } from 'src/app/Interfaces/iProyectos';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons/faDeleteLeft'
import { faGithub} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() proyectos: proyectos = {}
  @Output() deletePj = new EventEmitter();
  del = faDeleteLeft;
  edit = faPenToSquare;
  faGitHub = faGithub;
  constructor() { }

  ngOnInit(): void {
  }

  delete(id: any){
    var res = window.confirm("Desea eliminar?")
    if(res){
      this.deletePj.emit(id);
    }
  }


}
