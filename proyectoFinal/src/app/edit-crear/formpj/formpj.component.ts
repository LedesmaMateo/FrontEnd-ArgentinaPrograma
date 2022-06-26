import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { proyectos } from 'src/app/Interfaces/iProyectos';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formpj',
  templateUrl: './formpj.component.html',
  styleUrls: ['./formpj.component.css']
})
export class FormpjComponent implements OnInit {
  form: FormGroup;
  id:number;
  proyecto: proyectos = {}

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiServiceService,
              private router: Router,
              private formBuild: FormBuilder,
              private sanitizer: DomSanitizer) 
              
  {
    this.formBuilder();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.apiService.getUnProj(this.id).subscribe((data: proyectos) => {
        this.proyecto = data;
      })
    }
  }

  private formBuilder(){
    this.form = this.formBuild.group({
      nombre_proyecto: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      img: ['',[]],
      link: ['',[Validators.required]]
    })
  }

  crear(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.apiService.createProy(this.form.value).subscribe(() =>{
        this.router.navigate(['/inicio']);
      })
    }
  }

  guardar(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.apiService.putProj(this.id, this.form.value).subscribe(() =>{
        this.router.navigate(['/inicio']);
      })
    }
  }

  capturarImg(event: any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) =>{
      this.form.value.img = imagen.base;
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
