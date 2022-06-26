import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/Interfaces/iEducacion';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formed',
  templateUrl: './formed.component.html',
  styleUrls: ['./formed.component.css']
})
export class FormedComponent implements OnInit {
  educacion: educacion = {};
  form: FormGroup;
  id: number;

  constructor(private formBuild: FormBuilder, private router: Router,
              private apiService: ApiServiceService, 
              private activatedRoute: ActivatedRoute, 
              private sanitizer: DomSanitizer) 
  {
    this.formBuilder();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.apiService.getUnaEduc(this.id).subscribe((data) => this.educacion = data);
    }  
  }

  private formBuilder(){
    this.form = this.formBuild.group({
      escuela: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required, Validators.min(1950), Validators.max(2100)]],
      fin: ['', [Validators.required, Validators.min(1950), Validators.max(2100)]],
      estado: ['', [Validators.required]],
      img: ['',[]]
    });
  }
  
  crear(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.apiService.createEduc(this.form.value).subscribe(() => {
        this.router.navigate(['/inicio'])
      })
    }
  }

  guardar(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.apiService.putEduc(this.id, this.form.value).subscribe(() =>{
        this.router.navigate(['/inicio'])
      })
    }
  }

  capturarImg(event: any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
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
