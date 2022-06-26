import { Component, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { habilidad } from 'src/app/Interfaces/iHabilidad';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidad: any[] = [];
  form: FormGroup;
  imagen: string;


  constructor(private formBuild: FormBuilder,
              private sanitizer: DomSanitizer,
              private service: ApiServiceService) 
  { 
    this.formBuilder();
  }

  ngOnInit(): void {
    this.service.getHabilidad().subscribe((data) =>{
      for(let i of data){
        this.habilidad.push(i)
      }
      })
      console.log(this.habilidad);
      
  }

  private formBuilder(){
    this.form = this.formBuild.group({
      nombre: ['', []],
      img: ['', []]
    })
  }

  guardar(event: Event){
    this.form.value.img = this.imagen;
    console.log( this.form.value.img);
    
    this.service.crearHabilidad(this.form.value).subscribe(() =>{
      console.log( this.form.value.img);
      console.log("gaurdado");
      
    })
  }

  captureFile(event:any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.imagen= imagen.base;
      console.log(this.form.value.img);     
    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result

      });
    };
    reader.onerror = error => {
      resolve({
        base: null
      });
    };
  })

}
