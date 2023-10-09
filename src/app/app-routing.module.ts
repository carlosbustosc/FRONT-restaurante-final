import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*---importar componentes---*/
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component'; 
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component'; 
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';

import { LoginRestauranteComponent } from './pages/login-restaurante/login-restaurante.component';

import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component';




/*----importar guard----*/
import { clienteGuard } from './guard/cliente.guard';


const routes: Routes = [

  { path: "inicio", component: InicioComponent },
  { path: "loginCliente", component: LoginClienteComponent },
  { path: "LoginRestauranteComponent", component: LoginRestauranteComponent },
  { path: "registroCliente", component: RegistroClienteComponent },
  { path: "restaurantes", component: RestaurantesComponent }, //canActivate:[clienteGuard]
  { path:"RegistroRestauranteComponent", component:RegistroRestauranteComponent },
  { path: "restaurante/:id", component: RestauranteComponent },
  { path: "**", pathMatch:"full", redirectTo: "restaurantes" }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
