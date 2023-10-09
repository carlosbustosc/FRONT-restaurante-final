import { Component, OnInit } from '@angular/core';

/*------conectar servicios-------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------usar rutas ROUTER-----------*/
import { Router } from "@angular/router"



@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  /*---saludo inicial---*/
    nombrePersona:any;

    departamentos:any = []
    ciudades:any = []

    elegir_comida = false;
    nombreCategoria = ""


    /*-------filtro por categoria de comida-----*/
    categoriaPorComida:any = []



    /*---conetendores visuales----*/
    contenedorRestaurantes = true;
    contenedorVacio = false;
    contenedorCategoriaRestaurante = false;
    noHayCategoria = false;




    /*---resultado de restaurantes en la ciudad---*/
    guardarArrRestaurante:any = []



    /*-----datos que vienen del cliente-----*/
    DepartamentoCliente:any;
    CiudadCliente:any;
    /*-----datos que vienen del cliente-----*/

    constructor( private usarRuta:Router, private conectarServicio:RestauranteService ){
    }


    ngOnInit(): void {

      /*--saludo--*/
      this.nombrePersona = localStorage.getItem('nombre')

      /*-----datos que vienen del cliente-----*/
      this.DepartamentoCliente =  localStorage.getItem('departamento') 
      this.CiudadCliente  =  localStorage.getItem('ciudad') 
      /*-----datos que vienen del cliente-----*/




      /*----cargar departamentos  por defecto----*/
      this.departamentos = this.conectarServicio.ciudades()
          .subscribe( (resp:any) => {

            this.departamentos = resp          ;
            console.log( this.departamentos );

          })
       /*----cargar departamentos  por defecto----*/
      



          /*-----ciudad por defecto----*/
          this.elegirCiudad( this.CiudadCliente );
          /*----ciudad por defecto----*/
      
    }




    parametroCiudad( parametro:any ){

      this.ciudades = this.departamentos[parametro].ciudades
      //console.log( parametro );
    
    }




    elegirCiudad(ciudad:string){
      //console.log( ciudad );
      this.CiudadCliente = ciudad;

      this.conectarServicio.filtrarRestaurantes( ciudad )
          .subscribe( resp => {

            if( resp.length > 0 ){

              this.guardarArrRestaurante = resp;

              console.log(resp);

              /*---motrar contenedores---*/
              this.contenedorRestaurantes = true;
              this.elegir_comida = true;
              this.contenedorVacio = false;
              this.noHayCategoria = false;

            
            }else{

              console.log("no se encontraron registros");

               /*---motrar contenedores---*/
               this.contenedorRestaurantes = false;
               this.elegir_comida = false;
               this.contenedorVacio = true;
               this.contenedorCategoriaRestaurante = false;

            }

          })
    
    }


  

    seleccionarCategoria( categoria:string ){

      this.nombreCategoria = categoria
     console.log( categoria )
      //console.log( this.guardarArrRestaurante )

      let RestaurantPorCategoria:any = []

      Object.values( this.guardarArrRestaurante ).forEach( (resp:any) => {
        
        let todosLosRestaurante = resp;
        let todasLasCategorias  = resp.categoria;
        //console.log( todasLasCategorias )

        if( todasLasCategorias.indexOf( categoria ) >= 0 ){

          RestaurantPorCategoria.push(todosLosRestaurante);

          this.contenedorRestaurantes = false;
          this.contenedorCategoriaRestaurante = true;

        }

      })


      
   
      this.categoriaPorComida = RestaurantPorCategoria 

      if(this.categoriaPorComida.length > 0){

        console.log("hay restaurante");
        this.noHayCategoria = false;
      
      }else{

        if(categoria == "Todos"){

          /*--reset--*/
          this.categoriaPorComida = this.guardarArrRestaurante;
          this.contenedorCategoriaRestaurante = true;
          this.noHayCategoria = false;
          

        }else{

          console.log("no hay restaurante");
          this.noHayCategoria = true;
          this.contenedorCategoriaRestaurante = false;
          this.contenedorRestaurantes = false;

        }
        

      }
      
    }



    verRestaurante(id:any){

      //console.log(id);
      this.usarRuta.navigate([ 'restaurante', id ])
    
    }


}
