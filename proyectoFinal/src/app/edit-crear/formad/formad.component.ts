import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { perfil } from 'src/app/Interfaces/iPerfil';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-formad',
  templateUrl: './formad.component.html',
  styleUrls: ['./formad.component.css']
})
export class FormadComponent implements OnInit {
  perfil: perfil = {};
  form: FormGroup;
  id: number;
  image_background_header: string;
  image_perfil: string;

  constructor(private apiService: ApiServiceService, private activetedRoute: ActivatedRoute,
              private routes: Router,private formBuild: FormBuilder, private sanitizer: DomSanitizer)

  { 
    this.formBuilder();
  }

  ngOnInit(): void {
    this.id = this.activetedRoute.snapshot.params['id'];
    this.apiService.getUnPerfil(this.id).subscribe((data) => this.perfil = data); 
    
  }

  private formBuilder(){
    this.form = this.formBuild.group({
      nombre_completo: ['', [Validators.required]],
      ocupacion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      image_background_header: ['', []],
      image_perfil: ['', []]
    })
  }

  guardar(event: Event){
    this.form.value.image_background_header = this.image_background_header;
    this.form.value.image_perfil = this.image_perfil;
    event.preventDefault();
    if(this.form.valid){
      this.apiService.putPerf(this.id ,this.form.value).subscribe(() => {
        this.routes.navigate(['/inicio']);
        console.log(this.form.value.image_background_header);

      })
    }
  }

  capturarImgPerfil(event: any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.image_perfil = imagen.base;
    })
  }

  capturarImgPortada(event: any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.image_background_header = imagen.base;
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
