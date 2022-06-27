import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './portfolio/inicio.component';
import { FormadComponent } from './edit-crear/formad/formad.component';
import { FormexComponent } from './edit-crear/formex/formex.component';
import { FormedComponent } from './edit-crear/formed/formed.component';
import { FormpjComponent } from './edit-crear/formpj/formpj.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path: '' , redirectTo:'iniciar-sesion', pathMatch: 'full'},

  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'inicio' , component: InicioComponent, canActivate:[GuardGuard]},

  {path: 'experiencia', component: FormexComponent},
  {path: 'educacion', component: FormedComponent},
  {path: 'proyectos', component: FormpjComponent},

  {path: 'acerca-de/:id', component: FormadComponent},
  {path: 'experiencia/:id', component: FormexComponent},
  {path: 'educacion/:id', component: FormedComponent},
  {path: 'proyecto/:id', component: FormpjComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
