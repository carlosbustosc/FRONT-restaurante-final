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
  
  verLetraPerfil=true;

  mostrarMenuLogin = false;
  contenedorPerfil  = false;
  botonLogin = true;

  nombrePerfil:any;

  mostrarVentanaPerfil = false;

  num:number  = 1
  num2:number = 1;

  numeroNotificaciones = 0;

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

  numNotificaciones = true;

  numeroMensajes = 0;

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

  guardarImagenPerfil:any

  noHayNotificaciones = true;
  noHayMensajes = true;


  constructor( private usarRuta:Router,  private conectarServicio: RestauranteService ){

  }

  ngOnInit(): void {


    //comprobar si ya se reviso los mensajes
    if( localStorage.getItem('mensajeVisto') ){
        
      this.numNotificacionesMensajes = false;
      
      
    }

    if( localStorage.getItem('notificionVista') ){
      
      this.numNotificaciones = false
    }


    

    /*--------------cargar foto perfil Si es un cliente---------------*/
    if( localStorage.getItem('email') && ( localStorage.getItem('idPersona') )){
        
      this.conectarServicio.cargarImagenPerfil( localStorage.getItem('email') )
      .subscribe( (resp:any) => {
        console.log( resp )
  
        this.guardarImagenPerfil = resp.datosFoto.fotoF 
  
      }, (err => {
          
        // si no hay un registro de foto toca una predeterminada
        if(err.error.mensaje){

          this.guardarImagenPerfil =  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        
        }

      }))

    }
   
      

  
  
    /*---cliente---*/
    if( localStorage.getItem('nombre') || localStorage.getItem('correoREST')){
  
      this.verLetraPerfil = true;
      this.contenedorPerfil  = true;
      this.botonLogin = false;

        if( localStorage.getItem('nombre') ){
          
          this.nombrePerfil = localStorage.getItem('nombre');
          this.botonNotificaciones = true;
          this.notificacionMensajes = true;

          this.nombreCliente1 = false;
          this.nombreResturante1 = true;






          /*------cargar mensajes en la bandeja de entreda---------*/
          this.conectarServicio.cargarMensajesCliente(  localStorage.getItem('email')  )
              .subscribe( (resp:any) => {
                console.log(resp);
                
                this.noHayMensajes = false;

                this.guardarMensajes = resp.mensajesDB;
                this.numeroMensajes = this.guardarMensajes.length;
                

              }, (error) => {

                console.log(error.error.mensaje)
                this.noHayMensajes = true;
       
              })
                





          /*-------cargar notificaciones------*/
          this.conectarServicio.cargarNotificaciones( localStorage.getItem('email') )
              .subscribe( (resp:any) => {
               
    
                if(resp.length == 0){
                  
                  this.noHayNotificaciones = true;
                  console.log("no hay notificaciones")
                }else{
                  
                  console.log(resp)
                  this.guardarNotificacion = resp
                  this.numeroNotificaciones = this.guardarNotificacion.length;
                  this.noHayNotificaciones = false;
                 

                }
              
               

              }, (err) => {
                console.log(err)
              })


        }
        
        

    }else{

      this.nombrePerfil = ""
      this.contenedorPerfil  = false;
      this.botonLogin = true;
    
    }
  

    
    

    //---------------verificar INGRESO RESTAURANTE----------------------//

    //cargar foto perfil si es restaurante
    if( localStorage.getItem('nombreRestaurante') ){

      this.verLetraPerfil = false;

      /*--------cargar resturante------*/
      this.conectarServicio.traerUnRestaurante( localStorage.getItem('idRestaurante') )
      .subscribe( (resp:any) => {
        console.log(resp.respDB[0].foto[0])
        this.guardarImagenPerfil = resp.respDB[0].foto[0];
      })




      /*------------nav Restaurante-------------*/
      this.contenedorPerfil  = true;
      this.botonLogin = false;

      this.notificacionMensajes = true;

      this.nombreCliente1 = true;
      this.nombreResturante1 = false

      this.nombrePerfil = localStorage.getItem('nombreRestaurante');

      
      

      
      /*-----cargar mensajes restaurante--------*/
      this.conectarServicio.cargarMensajesRestaurante( localStorage.getItem('email') )
          .subscribe( (resp:any) => {
            console.log(resp)
            
            if(resp.length == 0){
              this.noHayMensajes = true
            }
            else{
              
              this.noHayMensajes = false
              this.guardarMensajes = resp;
              this.numeroMensajes = this.guardarMensajes.length;

              console.log(this.numeroMensajes)

            }
            
          })




      this.botonInicio = false;
      this.botonRestaurante = false;
      this.botonPedidos = true;
    }



  }
  


  //recibir mensaje dle hijo
  mensajeDesdeElHijo( mensajes:any ){
      
    console.log(mensajes);
    this.mensajeRespuesta = mensajes;
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

    if( localStorage.getItem('email') ){
        
      this.usarRuta.navigate([ '/perfil', localStorage.getItem('email') ]);

    }


    else if( localStorage.getItem('idRestaurante') ){
        
      this.usarRuta.navigate([ '/perfilRestaurante', localStorage.getItem('idRestaurante') ]);

    }

  }


  abrirNotificaciones(){
      
    this.numNotificaciones = false;

    localStorage.setItem('notificionVista', 'vista');
    
    if( this.num3 == 0 ){
      
      this.BaseNotificaciones = true;
      this.num3 = 1;

    }else{
      
      this.BaseNotificaciones = false;
      this.num3 = 0;


    }
    
  }


  borrarNotificacion( data:any, posicion:number ){
    
    //console.log( data._id )
    
    
    if (confirm('¿Desea eliminar esta notificacion?')) {
    
      this.conectarServicio.borrarNotificaciones( data._id )
            .subscribe( resp => {
              console.log(resp)
              
              alert("se ha borado el registro")
          
            
            })
    
    }
            
    
  }




  abrirMensajes(){
    
    localStorage.setItem('mensajeVisto', 'visto');

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
      
    console.log( objeto._id )
    
    
    if ( confirm('¿Seguro desea eliminar este mensaje?') ) {
        this.conectarServicio.borrarMensajes( objeto._id )
            .subscribe( resp => {
              console.log(resp);
            } )
    }
            
  }


  borrarMensajesClientes( objeto:any ){
      
    console.log( objeto._id );

    if ( confirm('¿Seguro desea eliminar este mensaje?') ) {
      this.conectarServicio.borrarMensajesClientes( objeto._id )
          .subscribe( resp => {

            console.log(resp);
          }, (err) => {

            console.log(err)
          })
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
  


  //ENVIAR MENSAJE ARA EL RESTURANTE
  enviarRespuesta(){
    
    //console.log("hola" + this.mensajeRespuesta)

    const mensajeRespuesta = {

      emailResturante : this.emailRestauranteMensaje,
      emailCliente : this.emailClienteMensaje,
      mensajeDecliente: this.mensajeRespuesta,
      nombreRestaurante :  this.nombreRestaurant,
      nombreCliente :  localStorage.getItem('nombre')

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
      mensajeDeResturante: this.mensajeRespuesta,
      mensajeDecliente : "default",
      nombreRestaurante :  this.nombreRestaurant

    }
  

    this.conectarServicio.guardarMensajes( mensajeRespuesta )

        .subscribe( resp => {
          console.log( resp );
         
          alert("el mensaje se ha enviado con exito")
          this.ventanaMensajesRespuesta = false;

      
        })

  }

}
