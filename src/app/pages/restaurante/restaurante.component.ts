import { Component, OnInit } from '@angular/core';

/*---recibir parametro---*/
import { Router,  ActivatedRoute } from "@angular/router";


/*-----------------conectar servicio-----------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';



/*------usar FormGroup-----*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import Swal from 'sweetalert2';



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})


export class RestauranteComponent implements OnInit {
  
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

  constructor(private usarRuta: Router, private recibirParametro:ActivatedRoute, private conectarServicio:RestauranteService, private fb:FormBuilder  ){
    
    /*----formComentario----*/
    this.formComentario = this.fb.group({
      comentario: ["", Validators.required ]
    })



    /*----cargar formulario dle MODAL----*/
    this.datosCliente = this.fb.group({
      ciudad:     [ localStorage.getItem('ciudad'),    Validators.required ],
      barrio:     [ localStorage.getItem('barrio'),    Validators.required ],
      direccion:  [ localStorage.getItem('direccion'), Validators.required ]
    })
  
  }
  
  

  
  ngOnInit(): void {

     /*--------cargar Comentarios del resturante-----------*/
     this.conectarServicio.cargarComentarios( localStorage.getItem('emailREST') )
     .subscribe( resp => {
       console.log(resp);

       this.guardarComentarios = resp;
       
     })


    
    /*--traer nombre usuario---*/
    this.nombreUsuario = localStorage.getItem('nombre');


    this.recibirParametro.params
        .subscribe( resp => {

          console.log("recibido: "+ resp['id'] ); // ID KKHFSUERIYWD3
          this.idRestaurante = resp['id']

          /*-----traer un restaurante------*/
          this.conectarServicio.traerUnRestaurante( resp['id'] )
              .subscribe( (resp:any) => {
                console.log(resp.restaurante);
                this.informacionRestaurante = resp.restaurante; //TODA LA INFORMACION DEL RESTURANTE
              })

        })
  }



  
  
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

    }

  }


  


  /*-------------------GUARDAR SELCCIONADOS EN LOCAL STORAGE----------------*/

  /*------------checkBox---------*/
  valueEntrada( valor:string ){
    
    console.log(valor)

    let posicion = this.arregloPedido.indexOf( valor );

    if( posicion === -1 ){/*----si no existe en el arreglo agreguelo---*/
     
      this.arregloPedido.push( valor )
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/
      //console.log("agrego: " + this.arregloPedido );

    }else{
     
      this.arregloPedido.splice( posicion, 1 );
      //console.log("elimino" + this.arregloPedido );

    }

  }



  valueEspecial( valueEspecial:string ){
    
  
    let posicion2 = this.arregloPedido.indexOf( valueEspecial );
    console.log(posicion2);

    if(posicion2 === -1){
  
      this.arregloPedido.push( valueEspecial );
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/

    }else{

      this.arregloPedido.splice( posicion2, 1 );

    }
   
  }




  valueBebidas( valueBebidas:string ){
    
    let posicion3 = this.arregloPedido.indexOf( valueBebidas );

    if( posicion3 === -1 ){

        this.arregloPedido.push(valueBebidas );

    }else{

      this.arregloPedido.splice( posicion3, 1 );
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/
    
    }

  }







  pedirDomicilio( ){

    let idRestaurante = this.idRestaurante;
    let nombresResturante = this.informacionRestaurante.nombreRestaurante;
    let fotoRestaurante = this.informacionRestaurante.foto[0];
    let emailRestaurante =  this.informacionRestaurante.email;
    let fecha = new Date();
    let mes = fecha.toDateString();


    let nombre = localStorage.getItem('nombre');
    let correo = localStorage.getItem('email');
    let pedido = this.arregloPedido;
    let DatosCliente = this.datosCliente.value;

    
    

      this.conectarServicio.agendarDomicilio( idRestaurante, nombresResturante, fotoRestaurante, emailRestaurante, mes, nombre, correo, pedido, DatosCliente)
    
      .subscribe( resp => {
            console.log( resp );

            this.modalPedido = false;

            setTimeout(function(){

              Swal.fire({
                title: "Su pedido fue agendado correctamente!",
                text: "Estara llegando de 30 a 40 minutos!",
                icon: "success"
              });

            }, 500)
        
            setTimeout(function(){

              window.location.href = `#/perfil/${ localStorage.getItem('email') }`;
            
          }, 4000) 
  
          localStorage.setItem("agendado", "si");
          
          /*---guardar valor en locaStorage----*/
          localStorage.setItem('ValorAgendado', 'SiAgendado');

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











    


