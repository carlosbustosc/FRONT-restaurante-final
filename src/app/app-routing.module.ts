import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*---importar componentes---*/
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component'; 
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component'; 
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { LoginRestauranteComponent } from './pages/login-restaurante/login-restaurante.component';
import { InternaRestauranteComponent } from './pages/interna-restaurante/interna-restaurante.component';


import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component';



/*----importar guard----*/
import { clienteGuard } from './guard/cliente.guard';
import { restauranteGuard } from './guard/restaurante.guard';


const routes: Routes = [

  { path: "inicio", component: InicioComponent, canActivate:[clienteGuard] },
  { path: "loginCliente", component: LoginClienteComponent },
  { path: "perfil/:id", component:PerfilComponent },
  { path: "LoginRestauranteComponent", component: LoginRestauranteComponent },
  { path: "registroCliente", component: RegistroClienteComponent },
  { path: "restaurantes/:categoria", component: RestaurantesComponent }, //
  { path: "RegistroRestaurante", component:RegistroRestauranteComponent },
  { path: "restaurante/:id", component: RestauranteComponent },
  { path: "internaRestaurante", component:InternaRestauranteComponent, canActivate:[ restauranteGuard ] },
  { path: "**", pathMatch:"full", redirectTo: "inicio" }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
