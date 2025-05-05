import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



/*-------conectar servicios------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-interna-restaurante',
  templateUrl: './interna-restaurante.component.html',
  styleUrls: ['./interna-restaurante.component.css']
})
export class InternaRestauranteComponent implements OnInit{
  
  mensajes = "Seleccione un mensaje"
  dataPedidos:any = []
  posicion:any

  mensajeBoton = "Eliminar pedido"

  informacionDetalle:any = {}

  pEntregado:boolean = false;

  mostrarPantallaDetalle = false;
  mostrarPantallaInformacion = true;

  pantallaPedidoEntregado = false;

  mostrarPantallaAceptado = false;
  mostrarMensajes = true;

  mensaje ='';

  guardarComentarios:any[] = []

  base_comentarios = false;


  ArrGestionados:any;
  ArrAceptados:any;
  ArrRechazados:any;

  //contador en ACEPTADOS /RECHAZADOS
  contarRechazados:number = 0;
  contarAceptados :number = 0;

  //contador comentarios
  contarComentarios:number = 0;

  //contador de pedidos
  contarPedidos:number = 0;




  mostrarGestionado = false;
  
  tipoPedido = "rechazados"
  
  pEliminar = false;
  

  constructor(private conectarServicio:RestauranteService, private fb: FormBuilder ){
    
   
  } 
  





  ngOnInit(): void {

    /*---traer correo localStorage---*/
     let emailRestaurante = localStorage.getItem('email');

     
       // cargar pedidos nuevos 
       this.pedidosNuevos( emailRestaurante )
    
    
      //cargar mensajes gestionado
      this.mensajesGestionados()


      //cargar comentarios
      this.cargarComentarios()


  }

  pedidosNuevos( emailRestaurante:any ){

    this.conectarServicio.traerPedidosDeRestaurante( emailRestaurante )
    .subscribe( (resp:any) => {
     
     this.dataPedidos = resp.datosDomicilios;

     this.contarPedidos = resp.datosDomicilios.length;
     console.log(resp);
 
   })

  }


  verMensaje( valor:number, valor2:number, datos:any){
  
    this.mostrarGestionado = false;
     this.base_comentarios = false;

      console.log(valor)
      console.log(datos.correoCliente)

      
      this.posicion = document.getElementById(`${valor}`)
      this.posicion.style.display = "none"
      

    /*----cargar notificaciones-----*/
      this.conectarServicio.cargarNotificaciones( datos.correoCliente )
          .subscribe( resp => {
           // console.log(resp)
                      
            this.mostrarPantallaDetalle = true;
            this.mostrarPantallaInformacion = false;
            this.mostrarPantallaAceptado = false;

          })
      /*---cargar notificaciones----*/


      this.informacionDetalle =  this.dataPedidos[valor2];
      console.log( this.informacionDetalle );


      this.mostrarPantallaDetalle = true;
      this.mostrarPantallaInformacion = false;


  }





  /*---rechazar pedido-------*/
  rechazarPedido(detalleCliente:any){
      
    console.log(detalleCliente)

    let infoNotificacion = {
      
      nombreCliente: detalleCliente.nombreCliente,
      ciudad: detalleCliente.ciudad,
      barrio: detalleCliente.barrio,
      direccionCliente: detalleCliente.direccionCliente,
      fechaDomicilio: detalleCliente.fechaDomicilio,
      pedido: detalleCliente.pedido,

      correoCliente: detalleCliente.correoCliente,
      notificacion : 'Su Pedido Ha sido Aceptado por ' + localStorage.getItem('nombreRestaurante'),
      estado: 'rechazado'
   
    }

    

    Swal.fire({
      title: "Esta seguro?",
      text: "¿Desea rechazar este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.conectarServicio.borrarPedido( detalleCliente._id )
          .subscribe( resp => {
            console.log(resp)
            
          })
            
   
  
       this.conectarServicio.ResgitrarNotificacion( infoNotificacion )
                .subscribe( resp => {
                  console.log(resp)
                  //alert('ha sido aceptado correctamente')
                })

        Swal.fire({
          title: "muy Bien!",
          text: "El pedido aparecera en la bandeja de rechazados.",
          icon: "success"
        }).then( () => {

          setInterval(() => {
            window.location.reload();
          }, 1000); // 30000 ms = 30 segundos
          
        })
      }
    });

    
  }



   /*-----aceptar pedido----*/
   aceptarPedido( detalleCliente:any ){
      
  
    ///console.log(detalleCliente)

    let infoNotificacion = {
      
      nombreCliente: detalleCliente.nombreCliente,
      ciudad: detalleCliente.ciudad,
      barrio: detalleCliente.barrio,
      direccionCliente: detalleCliente.direccionCliente,
      fechaDomicilio: detalleCliente.fechaDomicilio,
      pedido: detalleCliente.pedido,

      correoCliente: detalleCliente.correoCliente,
      notificacion : 'Su Pedido Ha sido Aceptado por ' + localStorage.getItem('nombreRestaurante'),
      estado: 'aceptado'
   
    }
    


    Swal.fire({
      title: "Seguro?",
      text: "si confirma se almacenara en la bandeja de Aceptados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, aceptar pedido!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.conectarServicio.ResgitrarNotificacion( infoNotificacion )
                .subscribe( resp => {
                  console.log(resp)
                  //alert('ha sido aceptado correctamente');

                })

    
      this.conectarServicio.borrarPedido( detalleCliente._id )
          .subscribe( resp => {
              console.log( resp );

                //alert(" El pedido fue entregado y sera eliminado de la base de datos");
          })


        Swal.fire({
          title: "Bien!",
          text: "El pedido se ha guardado en la bandeja de aceptados.",
          icon: "success"
        }).then( () => {

          setInterval(() => {
            window.location.reload();
          }, 1000); // 30000 ms = 30 segundos

        })
      }
    });


   

  }



  /*-----------------pedido Entregado-----*/
   pedidoEntregado( detalleCliente:any, i:any ){

               console.log(detalleCliente)

              if (confirm('¿Se ha Entregado el pedido, si confirma se se borrara este domicilio?')) {
                
             
                /*---------notificacion----------*/
                let infoNotificacion = {
                  
                  nombreCliente: detalleCliente.nombreCliente,
                  ciudad: detalleCliente.ciudad,
                  barrio: detalleCliente.barrio,
                  direccionCliente: detalleCliente.direccionCliente,
                  fechaDomicilio: detalleCliente.fechaDomicilio,
                  pedido: detalleCliente.pedido,

                  correoCliente:  detalleCliente.correoCliente,
                  notificacion :  'Su Pedido Ha sido Entregado por ' + localStorage.getItem('nombreRestaurante'),
                  estado: 'entregado'
               
                }
                
                
                this.conectarServicio.ResgitrarNotificacion( infoNotificacion )
                      .subscribe( resp => {

                        console.log(resp);

                      }, (err) => {
                        console.log(err)
                      })
          
          
              } else {
                console.log('No Se ha Borrado el Registro');
              }
                

              
              
              this.eliminarGestionado( detalleCliente, i )



   }



  //Mensajes gestionados
   mensajesGestionados(){

    this.conectarServicio.traerGestionados()
        .subscribe(  (resp:any) => {
          

          //-----filtrar Datos----//
          let ArregloAceptados:any = []
          let ArregloRechazados:any = []

          Object.values( resp.registros ).forEach( (resp:any) => {
               
            
            let estado = resp.estado;
            if( estado.indexOf("aceptado") >=0 ){
        
                ArregloAceptados.push( resp ) 
            }

            if( estado.indexOf("rechazado") >=0 ){
        
                ArregloRechazados.push( resp ) 
            }

          })
            
          //contador mensajes
          this.contarRechazados = ArregloRechazados.length
          this.contarAceptados  = ArregloAceptados.length

          

          //guardamos el arreglo filtrado 
          this.ArrAceptados  = ArregloAceptados;
          this.ArrRechazados = ArregloRechazados;

          console.log(this.ArrAceptados)
          console.log(this.ArrRechazados)

        
        }, (error) => {

          console.log(error);
       
          this.mensajes = "No se encontraron registros"
          this.mostrarGestionado = false;
          this.mostrarPantallaInformacion = true;


        })
        
   }


   gestionados( estado:string ){
    
    this.mostrarGestionado = true;
    this.base_comentarios = false;
    this.pEliminar = true;

    if(estado == "rechazado"){
        
       this.ArrGestionados = this.ArrRechazados;
       this.tipoPedido = "rechazados"
       this.mensajeBoton = "Eliminar rechazado"
       
    }

    if(estado == "aceptado"){
      
      this.ArrGestionados = this.ArrAceptados;
      this.tipoPedido = "aceptados"
      this.mensajeBoton = "Eliminar aceptado"
      

   }

 

    this.mostrarPantallaDetalle = false;
    this.mostrarPantallaInformacion = false;
      

   }
 


   /*-------------enviar Mensaje-----------*/
   enviarMensaje(){
    
    
     /*-----se esta realizando la inscripcion con ngModel------*/
    console.log( this.mensaje ); 

    const mensaje = {
      emailResturante   : localStorage.getItem('email'),
      mensajeCliente     : "default",
      mensajeDeResturante : this.mensaje,
      nombreRestaurante  : localStorage.getItem('nombreRestaurante'),
      emailCliente      : this.informacionDetalle.correoCliente,
    }

    console.log( mensaje );


    this.conectarServicio.guardarMensajes( mensaje )
        .subscribe( resp => {
          console.log( resp );
         
          alert("el mensaje se ha enviado con exito")
          this.mensaje = ""

        })
   }










   //cargar comentarios
  cargarComentarios(){

    this.conectarServicio.cargarComentarios( localStorage.getItem('email') )
    .subscribe( (resp:any) => {
      //console.log( resp )
  
      this.contarComentarios = resp.length;
      this.guardarComentarios = resp;

    })

   }

  traerComentarios(){
    
    this.mostrarGestionado = false;
    this.mostrarPantallaDetalle = false;
    this.mostrarPantallaDetalle = false;
    this.mostrarPantallaInformacion = false;

    this.base_comentarios = true;

   }



   borrarComentariosPerfil( datos:any){
      
    console.log(datos)
      

    Swal.fire({
      title: "Esta seguro?",
      text: "¿Desea borrar este comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.conectarServicio.borrarComentarioPerfil( datos._id )
        .subscribe( resp => {
          console.log( resp )
        })

        Swal.fire({
          title: "muy Bien!",
          text: "El comentario ya no aparecera en el perfil del restaurante.",
          icon: "success"
        }).then( () => {
            
          setInterval(() => {
            window.location.reload();
          }, 1000); // 30000 ms = 30 segundos

        })
      }
    });

      
  
}
     

     






  eliminarGestionado( datosGestionado:any, indice:any ){
        
      const idGestionado = datosGestionado[indice]._id
      
      
      Swal.fire({
        title: "Esta seguro?",
        text: "¿Desea borrar este domicilio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.conectarServicio.eliminarGestionado( idGestionado )
          .subscribe( resp => {
            console.log(resp)

          })

          Swal.fire({
            title: "Borrado!",
            text: "Se ha borrado de la bandeja de entrada.",
            icon: "success"
          }).then( () => {

            setInterval(() => {
              window.location.reload();
            }, 1000); // 30000 ms = 30 segundos

          })
        }
      });

     
  

     }

}


