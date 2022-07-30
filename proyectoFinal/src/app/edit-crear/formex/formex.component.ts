import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { experiencia } from 'src/app/Interfaces/iExperiencia';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formex',
  templateUrl: './formex.component.html',
  styleUrls: ['./formex.component.css']
})
export class FormexComponent implements OnInit {
  form: FormGroup;
  id: number;
  experiencia: experiencia = {};
  logo: string;

  constructor(private formBuild: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: ApiServiceService,
              private sanitizer: DomSanitizer) 
  { 
    this.formBuilder(); 
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.apiService.getUnaExp(this.id).subscribe((data) =>{
        this.experiencia = data;
      })
    }
  }

  private formBuilder(){
    this.form = this.formBuild.group({
      nombre_puesto: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      inicio: ['',[Validators.required, Validators.min(1950), Validators.max(2100)]],
      fin: ['',[Validators.required, Validators.min(1950), Validators.max(2100)]],
      logo: ['',[]],
    })
  }

  crear(event: Event){
    event.preventDefault();
    this.form.value.logo = this.logo;
    if(this.form.valid){
      this.apiService.createExp(this.form.value).subscribe(() =>{
        this.router.navigate(['/inicio']);
      })
    }
  }

  guardar(event: Event){
    event.preventDefault();
    this.form.value.logo = this.logo;
    if(this.form.valid){
      this.apiService.putExp(this.id, this.form.value).subscribe(() =>{
        this.router.navigate(['/inicio']);
      })
    }
  }

  capturarImg(event: any){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.logo = imagen.base; 
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
