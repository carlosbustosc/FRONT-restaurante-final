import { Component, OnInit } from '@angular/core';

/*---recibir parametro---*/
import { ActivatedRoute } from "@angular/router";


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

  arregloPedido:any = [];
  

  /*---formulario modal----*/
  datosCliente: FormGroup;

  constructor(private recibirParametro:ActivatedRoute, private conectarServicio:RestauranteService, private fb:FormBuilder  ){
    

    /*----cargar formulario dle MODAL----*/
    this.datosCliente = this.fb.group({
      ciudad:     [ localStorage.getItem('ciudad'),    Validators.required ],
      barrio:     [ localStorage.getItem('barrio'),    Validators.required ],
      direccion:  [ localStorage.getItem('direccion'), Validators.required ]
    })
  
  }
  
  
  
  ngOnInit(): void {
  
    this.recibirParametro.params
        .subscribe( resp => {

          console.log("recibido: "+ resp['id']);

          /*-----traer un restaurante------*/
          this.conectarServicio.traerUnRestaurante( resp['id'] )
              .subscribe( resp => {
                console.log(resp);
                this.informacionRestaurante = resp;
              })

        })
  }


  solicitarDomicilio(){


    if( localStorage.getItem('correo') ){
        
      this.modalPedido = true;
      

    }else{

      alert("por favor registrese e inicie sesion para realizar el pedido");

    }

  }


  cerrarModal(){

    this.modalPedido = false;
  }



  /*------------checkBox---------*/
  valueEntrada( valor:string ){
    
    let posicion = this.arregloPedido.indexOf( valor );

    if( posicion === -1 ){/*----si no existe en el arreglo agreguelo---*/
     
      this.arregloPedido.push( valor )
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
    }

  }




}
