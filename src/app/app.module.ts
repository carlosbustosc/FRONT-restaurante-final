import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component'; 

/*----importar formularios---*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms' 

/*-----importar HttpClientModule----*/
import { HttpClientModule } from '@angular/common/http';
import { LoginRestauranteComponent } from './pages/login-restaurante/login-restaurante.component';



/*-----------------importar servicio js--------------*/
import { CargaJSService } from './services/carga-js.service';
import { InternaRestauranteComponent } from './pages/interna-restaurante/interna-restaurante.component';
import { PerfilComponent } from './pages/perfil/perfil.component'; 




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    RestaurantesComponent,
    LoginClienteComponent,
    RegistroClienteComponent,
    RestauranteComponent,
    RegistroRestauranteComponent,
    LoginRestauranteComponent,
    InternaRestauranteComponent,
    PerfilComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CargaJSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
