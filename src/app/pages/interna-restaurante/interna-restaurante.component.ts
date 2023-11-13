import { Component, OnInit } from '@angular/core';



/*-------conectar servicios------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-interna-restaurante',
  templateUrl: './interna-restaurante.component.html',
  styleUrls: ['./interna-restaurante.component.css']
})
export class InternaRestauranteComponent implements OnInit{
    
  dataPedidos:any = []
  posicion:any

  informacionDetalle:any = {}

  mostrarPantallaDetalle = false;
  mostrarPantallaInformacion = true;

  pantallaPedidoEntregado = false;

  constructor(private conectarServicio:RestauranteService ){

  } 
  
  ngOnInit(): void {
    
    /*---traer correo localStorage---*/
     let emailRestaurante = localStorage.getItem('email');

     
     this.conectarServicio.traerPedidosDeRestaurante( emailRestaurante )
         .subscribe( resp => {
          
          this.dataPedidos = resp;
          console.log(resp);

        })

      

  }


  verMensaje( valor:number, valor2:number){
  
      console.log(valor)

      this.posicion = document.getElementById(`${valor}`)
      this.posicion.style.display = "none"
      

      this.informacionDetalle =  this.dataPedidos[valor2];
      console.log(this.informacionDetalle );


      this.mostrarPantallaDetalle = true;
      this.mostrarPantallaInformacion = false;


  }





  /*---rechazar pedido-------*/
  rechazarPedido(detalleCliente:any){
      

    if (confirm('¿Desea eliminar este registro?')) {
      this.conectarServicio.borrarPedido( detalleCliente.idCliente )
          .subscribe( resp => {
            console.log(resp)
            alert('Este pedido ha sido rechazado')
          })


      /*---------notificacion----------*/
      let infoNotificacion = {

        correoCliente:  detalleCliente.correoCliente,
        notificacion :  'Su Pedido Ha sido Cancelado por ' + localStorage.getItem('nombreRestaurante')
     
      }
  
      this.conectarServicio.ResgitrarNotificacion( infoNotificacion )


    } else {
      console.log('No Se ha Borrado el Registro');
    }
   

  }






   /*-----aceptar pedido----*/
   aceptarPedido( detalleCliente:any ){
     


    let infoNotificacion = {

      correoCliente: detalleCliente.correoCliente,
      notificacion : 'Su Pedido Ha sido Aceptado por ' + localStorage.getItem('nombreRestaurante')
   
    }

    this.conectarServicio.ResgitrarNotificacion( infoNotificacion )
              .subscribe( resp => {
                console.log(resp)
                alert('ha sido aceptado correctamente')
              })
   
  }








  /*-----------------pedido Entregado-----*/
   pedidoEntregado( detalleCliente:any ){

   
              if (confirm('¿Se ha Entregado el pedido?')) {

                this.conectarServicio.borrarPedido( detalleCliente.idCliente )
                      .subscribe( resp => {
                        console.log( resp );

                        alert(" El pedido fue entregado y sera eliminado de la base de datos");
                      })
          

                /*---------notificacion----------*/
                let infoNotificacion = {
          
                  correoCliente:  detalleCliente.correoCliente,
                  notificacion :  'Su Pedido Ha sido Entregado por ' + localStorage.getItem('nombreRestaurante')
               
                }
            
                this.conectarServicio.ResgitrarNotificacion( infoNotificacion )
          
          
              } else {
                console.log('No Se ha Borrado el Registro');
              }
   
              


   }

}
