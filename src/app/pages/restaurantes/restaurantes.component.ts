import { Component, OnInit } from '@angular/core';

/*------conectar servicios-------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------usar rutas ROUTER-----------*/
import { Router, ActivatedRoute } from "@angular/router"







/*----formGroup----*/
import { FormGroup, FormBuilder } from "@angular/forms"

import Swal from 'sweetalert2';






@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})

export class RestaurantesComponent implements OnInit {
  

  modalIniciarSession = false;
  texto = "agregar su Favorito";
 

  /*--select por defecto----*/
  selectForm:any = FormGroup;



  /*---saludo inicial---*/
    nombrePersona:any;

    departamentos:any = []/*---todos los departamentos--*/

    ciudades:any = []

 
    nombreCategoria = ""


    ocultarSaludo = false;


    /*-------filtro por categoria de comida-----*/
    categoriaPorComida:any = []



    /*---conetendores visuales----*/
    contenedorCardsRestaurantes = true;
    contenedorCategoriaRestaurante = false;


    contenedorVacio = false;
    noHayCategoria = false;
    quitarSelectTodasCiudades = true;




    //--- Variable donde se guarda los restaurantes encontrados ---//
    guardarResturantesDB:any = []



    /*-----datos que vienen del cliente-----*/
    DepartamentoCliente:any;
    CiudadCliente:any;
    /*-----datos que vienen del cliente-----*/



    /*---------guardar categoria que viene del inicio-----------*/
    guardarCategoria:any;



    /*----parametro Recibido del inicio----*/
    parametroRecibido:any;


    verificarFavorito:any

    corazonNormal = true;
    corazonRojo = false;
  
   

    constructor( private usarRuta:Router, private conectarServicio:RestauranteService, private recibirParametro:ActivatedRoute, private fb:FormBuilder ){

      

    }




    ngOnInit(): void {

      /*--------recibir parametro de inicio----------*/
       this.recibirParametro.params.subscribe( (resp:any) => {
     
        this.guardarCategoria = resp['categoria'];

        this.parametroRecibido = resp['categoria'];

      })

      

    
      /*-----DEPÁRTAMENTO CUIDAD, Y COMIDA POR DEFECTO------*/
      this.selectForm = this.fb.group({
        departamentoss: 'todos', // tolima
        categoriass: "Carnes",
        ciudadess: 'todos'
      })
        
        


      /*---------CARGAR DEPARTAMENTOS EN EL COMBO------------*/
      this.conectarServicio.ciudades()
          .subscribe( (resp:any) => {

            //--CARGAR DEPARTAMENTOS--//
            this.cargarDepartamentos(resp)

            //--CARGAR CUIDADES---//
            this.cargarCiudad( resp, '28' );     
      })
    
    }


    cargarDepartamentos( departamentos:any ){
      
      this.departamentos = departamentos;

    }
  
    
    cargarCiudad( array:any, Posicion:any ){
  
      this.ciudades = array[ Posicion ].ciudades;

    }

    
    


  




    /*-------SELECCIONAR CIUDAD-------*/

  
    elegirCiudad( ciudad:any ){
        
      console.log("elegir cuidad")
/*
        this.conectarServicio.filtrarRestaurantes( ciudad )
          .subscribe( resp => {
             
            if( resp.length > 0 ){  

              this.guardarArrRestaurante = resp;
              console.log(resp);

              //---motrar contenedores---
              this.contenedorRestaurantes = true;

         
              this.contenedorVacio = false;
              this.noHayCategoria = false;


               //-----seleccion Categoria Automatico------
              //this.seleccionarCategoria( "Carnes" );

              this.seleccionarCategoria(this.guardarCategoria) //--------------  SELECCIONAR CATEGORIA (SOPA, PESCADO ETC.  )
            
            }else{

              console.log("no se encontraron registros");

               //---motrar contenedores---
               this.contenedorRestaurantes = false;

               this.noHayCategoria = false;
       
               this.contenedorVacio = true;
               this.contenedorCategoriaRestaurante = false;

            }
               

          })
      */
    }
  





  /*
      this.conectarServicio.filtrarRestaurantes(categoriaComida)
          .subscribe( (resp:any) => {
            
            this.guardarResturantesDB = resp.respDB;
            console.log(resp);

          }, (err => {
            console.log(err.error.mensaje)
          }))
      */


    seleccionarComida( categoriaComida:any){

        console.log(categoriaComida);
  
    }

    
    seleccionarDepartamento( seleccionarDepartamento:any, posicion:any ){
      
      console.log(seleccionarDepartamento)
      console.log(posicion)

    }
  
    
    seleccionarCiudad( ciudad:string ){
        
      console.log( ciudad );

    }


      
    cerrarModalSession(){
      
      this.modalIniciarSession = false;
      
    }








    //----------------------VER EL RESTAURANTE---------------------  
    verRestaurante(datosREST:any, id:any){

    
      this.usarRuta.navigate([ '/restaurante', id ])

      localStorage.setItem( 'id', id );
      localStorage.setItem( 'emailREST', datosREST.email )
      
    }







    

    /*---------------------FAVORITOS-------------------*/
    agregarFavoritos( data:any, i:number ){

      console.log(data)
      
      if( localStorage.getItem('email') ){
        
            Swal.fire({
              title: "¿Desea agregarlo como favorito?",
              text: "El restaurante aparecera en tu perfil!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, agregar"
            }).then((result) => {
          
            if (result.isConfirmed) {
  
                this.conectarServicio.registrarFavorito( data )
                .subscribe( resp => {
                
                    console.log( resp )
                    Swal.fire({
                      title: "Se agrego correctamente!",
                      text: "Puedes buscarlo en tu perfil.",
                      icon: "success"
                    });
                    //this.verificarFavorito = resp.id
        
                  }, (err) => {
          
                    Swal.fire({
                      icon: "error",
                      title: "Ups",
                      text: "Este restaurante ya lo tienes en tu perfil como favorito!",
                 
                    });
        
                      console.log(err)
                  })
            }// termina el if del alert

          });

      }else{

        this.modalIniciarSession = true;
  
      }

   
    }

    /*--
    borrarCategoria( i:any ){

          $(`#favorito${i}`).css('display', 'block');
          $(`#favoritoH${i}`).css('display', 'none');

    }
    --*/



             
  
   


    
    
}
