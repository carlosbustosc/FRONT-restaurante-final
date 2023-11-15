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

  num4 = 0;

  numNotificaciones = false;

  numeroMensajes = 8

  numNotificacionesMensajes = true;

  notificacionMensajes = false;

  guardarMensajes:any[] = [];

  mostrarMensajes:boolean = false;

  ventanaMensajesRespuesta = false;

  nombreRespuesta:any

  mensajeRespuesta = "";

  emailClienteMensaje = ""

  emailRestauranteMensaje = ""
  
  guardarMensajesRestaurante:any;

  mostrarMensajesRestaurante = false;
  
  nombreRestaurant = ""
  
  nombreCliente1 = false;

  nombreResturante1 = false


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

          this.nombreCliente1 = false;
          this.nombreResturante1 = true;



          /*------cargar mensajes en la bandeja de entreda---------*/
          this.conectarServicio.cargarMensajes(  localStorage.getItem('email')  )
              .subscribe( resp => {
                console.log(resp);

                this.guardarMensajes = resp;
                this.numeroMensajes = this.guardarMensajes.length;
              
              })





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

          /*------------nav Restaurante-------------*/

          this.notificacionMensajes = true;

          this.nombreCliente1 = true;
          this.nombreResturante1 = false

          this.nombrePerfil = localStorage.getItem('nombreRestaurante');

          
          
          /*-----cargar mensajes restaurante--------*/
          this.conectarServicio.cargarMensajesRestaurante()
              .subscribe( resp => {
                console.log(resp)
                this.guardarMensajes = resp;
              })




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




  abrirMensajes(){
    

    this.numNotificacionesMensajes = false;

    if( this.num4 == 0 ){
      
      this.mostrarMensajes = true;
      this.num4 = 1;
    
    }else{
      
      this.mostrarMensajes = false;
      this.num4 = 0;

    }
    

  }


  borrarMensajes( objeto:any ){
    

    if ( confirm('¿Seguro desea eliminar este mensaje?') ) {
        this.conectarServicio.borrarMensajes( objeto.id )
            .subscribe( resp => {
              console.log(resp);
            } )
    }

  }



  cerrar_ventana_mensajes(){
      
    this.ventanaMensajesRespuesta = false;

  }


 
  abrirVentanaMensajes( datos:any ){
    
    this.mostrarMensajes = false;
    this.ventanaMensajesRespuesta = true;
    this.nombreRespuesta = datos.nombreRestaurante

    this.emailClienteMensaje = datos.emailCliente
    this.emailRestauranteMensaje = datos.emailResturante

    this.nombreRestaurant = datos.nombreRestaurante

  
    console.log( datos )
  
  }
  

  enviarRespuesta(){

    const mensajeRespuesta = {

      emailResturante : this.emailRestauranteMensaje,
      emailCliente : this.emailClienteMensaje,
      mensaje : this.mensajeRespuesta,
      nombreRestaurante :  this.nombreRestaurant

    }

    
    this.conectarServicio.mensajesParaRestaurante( mensajeRespuesta )
        .subscribe( resp => {
          
          console.log(resp)
          alert(' se ha enviado correctamente');
          this.mensajeRespuesta = ""
          this.ventanaMensajesRespuesta = false;

        })

  }
  


  enviarRespuesta2(){

    const mensajeRespuesta = {
      
      emailCliente : this.emailClienteMensaje,
      emailResturante : this.emailRestauranteMensaje,
      mensaje : this.mensajeRespuesta,
      nombreRestaurante :  this.nombreRestaurant

    }

    console.log(mensajeRespuesta)

    this.conectarServicio.guardarMensajes( mensajeRespuesta )
        .subscribe( resp => {
          console.log( resp );
         
          alert("el mensaje se ha enviado con exito")
          this.ventanaMensajesRespuesta = false;

      
        })

  }

}
