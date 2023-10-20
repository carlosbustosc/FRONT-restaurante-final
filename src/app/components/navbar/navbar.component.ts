import { Component, OnInit } from '@angular/core';

/*------------conectar servicios-------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';

/*----usar ruta----*/
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit {

  mostrarMenuLogin = false;
  contenedorPerfil  = false;
  botonLogin = true;

  nombrePerfil:any;

  mostrarVentanaPerfil = false;


  num:number  = 1
  num2:number = 1;

 
  constructor( private usarRuta:Router,  private conectarServicio: RestauranteService ){

  }

  ngOnInit(): void {

    if( localStorage.getItem('nombre') ){

      this.nombrePerfil = localStorage.getItem('nombre');
      this.contenedorPerfil  = true;
      this.botonLogin = false;

    }else{

      this.nombrePerfil = ""
      this.contenedorPerfil  = false;
      this.botonLogin = true;
    
    }

     
 
    }
  

  mostrarMenu(){
     
    if( this.num == 1 ){
      
      this.mostrarMenuLogin = true;
      this.num = 0;

    }else{

      this.num = 1;
      this.mostrarMenuLogin = false;
    }
    
    
  }


  ventanaPerfil(){

    if( this.num2 == 1 ){
      
      this.mostrarVentanaPerfil = true;
      
      this.num2 = 0;

    }else{

      this.num2 = 1;
      this.mostrarVentanaPerfil = false;
    }


  }



  cerrarSesion(){

    this.conectarServicio.cerrarSession()
    this.usarRuta.navigate( ['/loginCliente'] );
    this.botonLogin = false;
  }



  verPerfil(){

    this.usarRuta.navigate([ '/perfil', localStorage.getItem('idPersona') ]);

  }

 
  

}
