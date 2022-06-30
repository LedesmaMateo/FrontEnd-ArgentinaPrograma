import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup 
  autenticado: any;

  constructor(private formBuild: FormBuilder,
              private authService: AuthService) 
  {
    this.formBuilder();
  }

  ngOnInit(): void {  
    console.log(this.authService.UsuarioAutenticado);
    
  } 

  private formBuilder(){
    this.form = this.formBuild.group({
      usernameOrEmail: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(event: Event){
    event.preventDefault();
    if(this.form.valid){
        this.authService.login(this.form.value).subscribe(() =>{
          this.autehticado()
          
        });
    }

    this.autehticado()
  }

  autehticado(){
    if(this.authService.UsuarioAutenticado != null){
      this.autenticado = true;
      console.log("Si");
    }else{
      console.log("no");
      
    }
  }

}
