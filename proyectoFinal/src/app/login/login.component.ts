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
  auth: boolean = false;
  spinner: boolean = false;

  constructor(private formBuild: FormBuilder,
              private authService: AuthService,
              private routes: Router) 
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
    event.preventDefault()
    if(this.form.valid){
      this.spinner = true;
      this.authService.login(this.form.value).subscribe((data:any) => {
        console.log("Token: ", data );
        this.routes.navigate(['/inicio'])
      });
    }
  } 
}



