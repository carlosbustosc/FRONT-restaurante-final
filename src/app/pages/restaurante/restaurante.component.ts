import { Component, OnInit } from '@angular/core';

/*---recibir parametro---*/
import { Router,  ActivatedRoute } from "@angular/router";


/*-----------------conectar servicio-----------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';



/*------usar FormGroup-----*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms'




@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})


export class RestauranteComponent implements OnInit {
  
  informacionRestaurante:any = []
  modalPedido = false;


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
      comentario: ""
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
     this.conectarServicio.cargarComentarios()
     .subscribe( resp => {
       console.log(resp);
 
       this.guardarComentarios = resp;
       
      
 
     })


    
    /*--traer nombre usuario---*/
    this.nombreUsuario = localStorage.getItem('nombre');


    this.recibirParametro.params
        .subscribe( resp => {

          console.log("recibido: "+ resp['id'] );
          this.idRestaurante = resp['id']

          /*-----traer un restaurante------*/
          this.conectarServicio.traerUnRestaurante( resp['id'] )
              .subscribe( resp => {
                console.log(resp);
                this.informacionRestaurante = resp;
              })

        })
  }



  

  solicitarDomicilio(){

    if( this.arregloPedido <= 0){

      alert('No ha solicitado pedido')
    }else{

      if( localStorage.getItem('correo') ){
        
        this.modalPedido = true;
        
      }else{
  
        this.modalIniciarSession = true;

      }

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
    let correo = localStorage.getItem('correo');
    let pedido = this.arregloPedido;
    let DatosCliente = this.datosCliente.value;

    
    

      this.conectarServicio.agendarDomicilio( idRestaurante, nombresResturante, fotoRestaurante, emailRestaurante, mes, nombre, correo, pedido, DatosCliente)
    
      .subscribe( resp => {
            console.log( resp );

            this.modalPedido = false;

            setTimeout(function(){
              alert("su pedido ha sido agendado correctamente");
            }, 500)
        
            setTimeout(function(){

              window.location.href = `/perfil/${ localStorage.getItem('idPersona') }`;
            
          }, 1000) 

          
          /*---guardar valor en locaStorage----*/
          localStorage.setItem('ValorAgendado', 'SiAgendado');

      })
  
    }







  cerrarModal(){

    this.modalPedido = false;
  }

  
  cerrarModalSession(){

    this.modalIniciarSession = false;
    
  }



  /*------------checkBox---------*/
  valueEntrada( valor:string ){
    
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

        this.arregloPedido.push( valueBebidas );

    }else{

      this.arregloPedido.splice( posicion3, 1 );
      localStorage.setItem('comidaSeleccionada', JSON.stringify(this.arregloPedido) );/*---guardar como array---*/
    
    }

  }




  comentar(){

    let nombre = localStorage.getItem('nombre');
    let correo = localStorage.getItem('correo');
    let correoRestaurante = this.informacionRestaurante.email;
 


    let comentar = this.formComentario.controls['comentario'].value;
    console.log(comentar);


   
    this.conectarServicio.comentarioRestaurante(nombre, correo, comentar, correoRestaurante)
        .subscribe( resp => {
          console.log(resp);
        })

    

        
    /*--------cargar Comentarios del resturante-----------*/
    this.conectarServicio.cargarComentarios()
    .subscribe( resp => {
      console.log(resp);

      this.guardarComentarios = resp;
      
      alert("tu comentario de ha registrado correctmente");

      this.formComentario.reset();

    })
}


  }











    


