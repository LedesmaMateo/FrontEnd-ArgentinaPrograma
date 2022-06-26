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
  invalid: boolean;

  constructor(private formBuild: FormBuilder,
              private routes: Router,
              private authService: AuthService) 
  {
    this.formBuilder();
  }

  ngOnInit(): void {  

  } 

  private formBuilder(){
    this.form = this.formBuild.group({
      usernameOrEmail: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(event: Event){
    event.preventDefault();
    const usernameOrEmail = this.form.value.usernameOrEmail;
    const password = this.form.value.password;

    this.authService.login(usernameOrEmail, password).subscribe(() => { 
      this.routes.navigate(['/inicio'])
    }); 
      
  }



}
