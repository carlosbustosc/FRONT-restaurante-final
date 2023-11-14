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

  numeroNotificaciones:number = 8;

  nombreRestaurante:any;

  nombreCliente = false;
  nombreResturante = false;

  botonInicio = true;
  botonRestaurante = true;

  botonPedidos = false;
  
  botonNotificaciones = false;

  BaseNotificaciones = false;

  guardarNotificacion:any[] = []

  num3 = 0;

  numNotificaciones = false;

  numeroMensajes = 8

  numNotificacionesMensajes = true;

  notificacionMensajes = false;
 
  constructor( private usarRuta:Router,  private conectarServicio: RestauranteService ){

  }

  ngOnInit(): void {



    /*---cliente---*/
    if( localStorage.getItem('nombre') || localStorage.getItem('correoREST')){

      this.contenedorPerfil  = true;
      this.botonLogin = false;

        if( localStorage.getItem('nombre') ){
          
          this.nombrePerfil = localStorage.getItem('nombre');
          this.botonNotificaciones = true;
          this.notificacionMensajes = true;

          /*-------cargar notificaciones------*/
          this.conectarServicio.cargarNotificaciones( localStorage.getItem('correo') )
              .subscribe( resp => {
                console.log(resp)
                
                if( resp.length > 0 ){
                  this.numNotificaciones = true;
                }else{
                  this.numNotificaciones = false;
                }


                this.guardarNotificacion = resp
                this.numeroNotificaciones = this.guardarNotificacion.length;

              })


        }else{
          this.nombrePerfil = localStorage.getItem('nombreRestaurante');
          this.botonInicio = false;
          this.botonRestaurante = false;
          this.botonPedidos = true;
        }


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

    if( localStorage.getItem('idPersona') ){
        
      this.usarRuta.navigate([ '/perfil', localStorage.getItem('idPersona') ]);

    }


    else if( localStorage.getItem('idRestaurante') ){
        
      this.usarRuta.navigate([ '/perfilRestaurante', localStorage.getItem('idRestaurante') ]);

    }

  }


  abrirNotificaciones(){
      
    this.numNotificaciones = false;
    
    if( this.num3 == 0 ){
      
      this.BaseNotificaciones = true;
      this.num3 = 1;

    }else{
      
      this.BaseNotificaciones = false;
      this.num3 = 0;


    }
    
  }


  borrarNotificacion( data:any, posicion:number ){
    
    console.log( data.idNotificacion )
    

    if (confirm('¿Desea eliminar esta notificacion?')) {
    
      this.conectarServicio.borrarNotificaciones( data.idNotificacion )
            .subscribe( resp => {
              console.log(resp)
              
        
            
            })
    
    }
    
  }

 
  

}
