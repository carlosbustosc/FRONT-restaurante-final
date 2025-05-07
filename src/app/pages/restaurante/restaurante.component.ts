import { Component, OnInit } from '@angular/core';

/*---recibir parametro---*/
import { Router,  ActivatedRoute } from "@angular/router";


/*-----------------conectar servicio-----------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';



/*------usar FormGroup-----*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import Swal from 'sweetalert2';


//---volver---//
import { Location } from "@angular/common"



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})


export class RestauranteComponent implements OnInit {
  
  //---------Informacion al componente hijo---------//
  verContenedor:any = false;
  TituloNombreRestaurante:any;
  mostrarBotonEnviar:any = true;
  mensajeCliente:any=""

  //---------Informacion al componente hijo---------//
  
  //suma del pedido comprado
  sumarTotal:any;
  
  // variable donde se van guardando los precios
  totalComprado:any = 0;


  informacionRestaurante:any = []
  modalPedido = false;

  texto = "realizar el pedido";

  nombreUsuario:any; 

  arregloPedido:any = [];
  

  /*---formulario modal----*/
  datosCliente: FormGroup;


  /*----modal iniciar sesson---*/
  modalIniciarSession = false;


  /*---guardar comentario---*/
  formComentario: FormGroup;



  /*-----cargar comentarios-----*/
  guardarComentarios:any = [];


  idRestaurante:any;

  constructor(private usarVolver: Location , private usarRuta: Router, private recibirParametro:ActivatedRoute, private conectarServicio:RestauranteService, private fb:FormBuilder  ){
    
    /*----formComentario----*/
    this.formComentario = this.fb.group({
      comentario: ["", Validators.required ]
    })



    /*----cargar formulario dle MODAL----*/
    this.datosCliente = this.fb.group({
      ciudad:     [ this.informacionRestaurante.ciudad,    Validators.required ],
      barrio:     [ localStorage.getItem('barrio'),    Validators.required ],
      direccion:  [ localStorage.getItem('direccion'), Validators.required ]
    })
  
  }
  
  
    

  ngOnInit(): void {

     /*-------Cargar Comentarios-----------*/
     this.conectarServicio.cargarComentarios( localStorage.getItem('emailREST') )
     .subscribe( resp => {

       console.log(resp);

       this.guardarComentarios = resp;
       
     })

      // Traer usuario si existe //
      this.nombreUsuario = localStorage.getItem('nombre');



    // Recibir parametro de la pantalla restaurantes //
    this.recibirParametro.params
        .subscribe( resp => {

          this.idRestaurante = resp['id']

          /*-----traer un restaurante------*/
          this.conectarServicio.traerUnRestaurante( this.idRestaurante )
              .subscribe( (resp:any) => {

                console.log(resp.respDB[0]);
                this.informacionRestaurante = resp.respDB[0]; //TODA LA INFORMACION DEL RESTURANTE

              }, (error) => { console.log(error.message) })

        })

        
  }

  

  get ciudad(){
      
    return this.datosCliente.controls['ciudad'].invalid && this.datosCliente.controls['ciudad'].touched;
     
   }

   get barrio(){

     return this.datosCliente.controls['barrio'].invalid && this.datosCliente.controls['barrio'].touched;
   }

   get direccion(){
   
     return this.datosCliente.controls['direccion'].invalid && this.datosCliente.controls['direccion'].touched;
       
   }


  volverArestaurante(){
    
      this.usarVolver.back()

  }


  abrirVentanaMensaje(){
  
    if( !localStorage.getItem('email') ){
      
      this.modalIniciarSession = true;
      this.texto = "para enviar un mensaje"

    }else{
      
      this.verContenedor = true;
      //titulo para ventana de mensaje
      this.TituloNombreRestaurante = this.informacionRestaurante.nombreRestaurante;

    }

    
  
  }

  //evento que viene del hijo
  cerrar_ventana_mensajes(){
    
    this.verContenedor = false;
  }
  
  //ngModel desde el hijo
  recibirMensajeDesdeHijo(mensaje:any){
    
    //console.log(mensaje);
    this.mensajeCliente = mensaje;
    
  }


  //ENVIAR MENSAJE PARA EL RESTURANTE
  enviarRespuesta(){
      
    //console.log("hola" + this.mensajeRespuesta)
  
  
    const mensajeRespuesta = {
  
      emailResturante :    localStorage.getItem('emailREST'),
      emailCliente :       localStorage.getItem('email'),
      mensajeDecliente:    this.mensajeCliente,
      nombreRestaurante :  this.informacionRestaurante.nombreRestaurante,
      nombreCliente:       localStorage.getItem('nombre')
  
    }
  
  
    
    this.conectarServicio.mensajesParaRestaurante( mensajeRespuesta )
        .subscribe( (resp:any) => {
          
          //console.log(resp)
          alert(resp.mensaje);
          this.verContenedor = false; //cerrar ventana
          
        })
          
    
        
  }















  
  // solictar pedido
  solicitarDomicilio(){
    


    if( this.arregloPedido <= 0){

      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "Aun no ha solicitado el pedido!"
      });

    }else{

      if( localStorage.getItem('email') ){
        
        this.modalPedido = true;
        
      }else{
  
        this.modalIniciarSession = true;
        this.texto = "para solicitar su pedido"

      }
        

       /*----cargar formulario dle MODAL----*/
    this.datosCliente = this.fb.group({
      ciudad:     [ this.informacionRestaurante.ciudad,    Validators.required ],
      barrio:     [ localStorage.getItem('barrio'),    Validators.required ],
      direccion:  [ localStorage.getItem('direccion'), Validators.required ]
    })

    }


    

  }


  


  /*-------------------GUARDAR SELCCIONADOS EN LOCAL STORAGE----------------*/
 
  sumarTotalPrecios( precio:number ){
      
     
      this.totalComprado += precio;
     // console.log("total: " + this.totalComprado );

      //poner puntos
      let precioConpuntos = this.totalComprado.toLocaleString('es-CO');

      this.sumarTotal = precioConpuntos;
   

  }

  restarTotalPrecios( precio:number){
      
    this.totalComprado -= precio;
     // console.log("total: " + this.totalComprado );

      //poner puntos
      let precioConpuntos = this.totalComprado.toLocaleString('es-CO');

      this.sumarTotal = precioConpuntos;

  }
  



  /*------------checkBox---------*/
  valueEntrada( valor:string ){
    
    let numero = 0;
    console.log(valor)

    //obtener solo el valor pesos
    const precio = valor;
    const match = precio.match(/\$(\d+(\.\d+)?)/);
    if(match){
      ///console.log(match[1])
      numero = parseFloat( match[1].replace('.', '') ) //convertir string a numero
      //console.log(numero)
    }
    
    

    





    let posicion = this.arregloPedido.indexOf( valor ); // buscar comida dentro el array
    
    this.arregloPedido.push( valor )
    //console.log(this.arregloPedido)
    localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/
    this.sumarTotalPrecios(numero) // funcion que suma

    /*
    if( posicion === -1 ){//----si no existe en el arreglo agreguelo---//
     
      this.arregloPedido.push( valor )
      //console.log(this.arregloPedido)
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );//---guardar como array---//
      //console.log("agrego: " + this.arregloPedido );

     

    }else{
     
      this.arregloPedido.splice( posicion, 1 );
      console.log("elimino" + this.arregloPedido );
      console.log(this.arregloPedido)


      this.restarTotalPrecios(numero) // restamos los precios

    }
      */

  }



  valueEspecial( valueEspecial:string ){
    



    let numero = 0;
    //obtener solo el valor pesos
    const precio = valueEspecial;
    const match = precio.match(/\$(\d+(\.\d+)?)/);
    
    if(match){
      ///console.log(match[1])
      numero = parseFloat( match[1].replace('.', '') ) //convertir string a numero
      console.log(numero)
    }







    let posicion2 = this.arregloPedido.indexOf( valueEspecial );
    //console.log(posicion2);


    this.arregloPedido.push( valueEspecial );
    localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/
    this.sumarTotalPrecios(numero) // funcion que suma


    /*
    if(posicion2 === -1){
  
      this.arregloPedido.push( valueEspecial );
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );//---guardar como array---

      this.sumarTotalPrecios(numero) // funcion que suma

    }else{

      this.arregloPedido.splice( posicion2, 1 );
      this.restarTotalPrecios(numero) // restamos los precios
    }
    */
   
  }




  valueBebidas( valueBebidas:string ){
    
    let numero = 0;
    //obtener solo el valor pesos
    const precio = valueBebidas;
    const match = precio.match(/\$(\d+(\.\d+)?)/);
    if(match){
      ///console.log(match[1])
      numero = parseFloat( match[1].replace('.', '') ) //convertir string a numero
      console.log(numero)
    }







    let posicion3 = this.arregloPedido.indexOf( valueBebidas );
    this.arregloPedido.push(valueBebidas );
    this.sumarTotalPrecios(numero) // funcion que suma
  
    /*
    if( posicion3 === -1 ){

        this.arregloPedido.push(valueBebidas );
        this.sumarTotalPrecios(numero) // funcion que suma

    }else{

      this.arregloPedido.splice( posicion3, 1 );
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );//---guardar como array---/
      
      this.restarTotalPrecios(numero) // restamos los precios
    }
      */

  }



  borrarComidaSolicitada( pedidos:any, posicion:number ){


    console.log( pedidos );
    
    //obtener solo el valor en pesos
    let comidaYPrecio = pedidos; //bandeja $5.000
    let soloPrecio    = comidaYPrecio.match(/\$(\d+(\.\d+)?)/); //5.000
    console.log(soloPrecio)

    if(soloPrecio){
         let quitarPuntosConvertirAnumero = parseFloat( soloPrecio[1].replace('.', '') ) // convertir string a numero   5000 
         console.log(quitarPuntosConvertirAnumero)
        
         this.restarTotalPrecios( quitarPuntosConvertirAnumero )
    }


    console.log( posicion );
    
    this.arregloPedido.splice(posicion, 1)

  }




  pedirDomicilio(){
    
    // informacion restaurante
    let idRestaurante      = this.idRestaurante;
    let nombresResturante  = this.informacionRestaurante.nombreRestaurante;
    let fotoRestaurante    = this.informacionRestaurante.foto[0];
    let emailRestaurante   =  this.informacionRestaurante.email;
    let fecha = new Date();
    let mes = fecha.toDateString();

    //informacion cliente
    let nombre = localStorage.getItem('nombre');
    let correo = localStorage.getItem('email');
    let pedido = this.arregloPedido;
    let DatosCliente = this.datosCliente.value;

    
    

      this.conectarServicio.agendarDomicilio( idRestaurante, nombresResturante, fotoRestaurante, emailRestaurante, mes, nombre, correo, pedido, DatosCliente)
    
      .subscribe( resp => {
            console.log( resp );
        
            this.modalPedido = false;
            
            localStorage.setItem('docimilio', "true")

            setTimeout( () => {

              Swal.fire({
                title: "Su pedido fue agendado correctamente!",
                html: `<p class="texto_mensaje">Estara llegando de 30 a 40 minutos!, a la ciudad de ${ this.datosCliente.controls['ciudad'].value }, barrio ${ this.datosCliente.controls['barrio'].value } a la siguiente direccion: ${ this.datosCliente.controls["direccion"].value  }</p>
                
                <p class="texto_nota">El pago se realiza contraentrega, cualquier anomalia por favor escribenos a : ${ this.informacionRestaurante.email }</p>
                
                <p class="texto_nota2">Para cancelar tu pedido ingresa a tu perfil en la seccion "Domicilios solicitados > cancelar pedido" ó llamanos al 601  ${ this.informacionRestaurante.Telefono }</p>`,
                icon: "success"
              }).then( () => {
                  
                window.location.href = `#/perfil/${ localStorage.getItem('email') }`;
                
              })

            }, 500)
        
        
  
          localStorage.setItem("agendado", "si");
          
          /*---guardar valor en locaStorage----*/
          localStorage.setItem('ValorAgendado', 'SiAgendado');

      }, (err) => {
            
        alert(err.error.mensaje)

      })
  
    }










    



 //------MODAL DEL PEDIDO YA LISTO PARA ENVIAR----
 cerrarModal(){

  this.modalPedido = false;
}


//------MODAL DE INICIO DE SESSION-----
cerrarModalSession(){

  this.modalIniciarSession = false;
  
}




















  comentar(){
    


    let nombre = localStorage.getItem('nombre');
    let correo = localStorage.getItem('email');
    let correoRestaurante = this.informacionRestaurante.email;
 

    if(nombre){
      
        if( this.formComentario.controls['comentario'].valid ){
          
          let comentar = this.formComentario.controls['comentario'].value;
  
          this.conectarServicio.comentarioRestaurante(nombre, correo, comentar, correoRestaurante)
          .subscribe( resp => {
          

            Swal.fire({
              title: "Muy bien!",
              text: "Gracias por comentarnos!",
              icon: "success"
            });

            setInterval(() => {
              window.location.reload();
            }, 3000); // 30000 ms = 30 segundos
            

            this.formComentario.reset()
  
          }, (error) => {
  
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Debe escribir un comentario!"
            });
          
          })
  
        }else{

          Swal.fire({
            icon: "error",
            title: "Ups",
            text: "Debe escribir un comentario!",
        
          });

        }

    

    }else{
      
      this.modalIniciarSession = true;
      this.texto = "para comentar"
        
    }
      
   
   

}


}











    


