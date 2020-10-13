import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';

const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  { path: 'login' , component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
