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
 

  /*--Formulario select por defecto----*/
  selectForm:any = FormGroup;

  

    /*---saludo inicial---*/
    nombrePersona:any;
  

    nombreCiudad:any = "colombia"

    //Array que conteniede todos los departamentos//
    departamentos:any = []

    //Array que contiene todas las ciudades//
    ciudades:any = []



    /*-------filtro por categoria de comida-----*/
    categoriaPorComida:any = []



    /*---contenedores visuales----*/
    noHayCategoria = true;

    

    // ocultar contenedor de las cards restaurantres //
    contenedorCardsRestaurantes = true;
  


    // ocultar combo de ciudades //
    SelectTodasCiudades = false;



    //--- Variable donde se guarda los restaurantes encontrados ---//
    guardarResturantesDB:any = []



    /*----guardar categoria que viene de la pantalla inicio--------*/
    guardarCategoria:any;




    ocultarSaludo = false;

    corazonNormal = true;

    corazonRojo = false;
  
    




    //-------campos para filtrar-------//
    comida = "";
    departamento = "";
    ciudad = "";

    constructor( private usarRuta:Router, private conectarServicio:RestauranteService, private recibirParametro:ActivatedRoute, private fb:FormBuilder ){

      

    }




    ngOnInit(): void {

      /*--------recibir parametro de inicio----------*/
       this.recibirParametro.params.subscribe( (resp:any) => {
        this.guardarCategoria = resp['categoria'];

      })

      

    
      /*-----DEPÁRTAMENTO  Y COMIDA POR DEFECTO------*/
      this.selectForm = this.fb.group({
        categoriass: this.guardarCategoria,
        departamentoss: 'todos', // tolima
      })

      // Buscar comida
      this.seleccionarComida( this.guardarCategoria );
        
     


      /*---------CARGAR DEPARTAMENTOS EN EL COMBO------------*/
      this.conectarServicio.ciudades()
          .subscribe( (resp:any) => {

            //--CARGAR DEPARTAMENTOS--//
            this.cargarDepartamentos(resp)

         
      })
    
    }


    cargarDepartamentos( departamentos:any ){
      
      this.departamentos = departamentos;

    }
  
    
    cargarCiudad( array:any, Posicion:any ){
  
      this.ciudades = array[ Posicion ].ciudades;

    }

    
    





      

    //-----FILTRAR POR COMIDA----//
    seleccionarComida( categoriaComida:any){

        this.comida = categoriaComida;

        if(this.comida == "Todos"){
          this.comida = "";
        }

        // funcion que tiene la peticion a servicios http
        this.peticionDaseDatos(this.comida, this.departamento, this.ciudad);
  
    }

    






     //-----FILTRAR POR DEPARTAMENTO----//
    seleccionarDepartamento( posicion:any ){
      
  
     if(posicion == "todos"){
     
      this.departamento = "" // departamento va vacio por defecto
      this.SelectTodasCiudades = false; //esconder_filtro ciudades

     
    }else{
    

      this.departamento = this.departamentos[posicion].id // 28 - tolima
      this.SelectTodasCiudades = true; //mostrar_filtro ciudades


      //enviar la seleccion todo al combo ciudad
      this.seleccionarCiudad( 'todos' );


      // colocar el option 1 en el select ciudades
      this.selectForm = this.fb.group({
        ciudadess: 'todos'
      })
     
    }

      // funcion que tiene la peticion a servicios http
      this.peticionDaseDatos(this.comida, this.departamento, this.ciudad); 

      
      //----cargar de una vez el combo las ciudades---//
      this.ciudades = this.departamentos[posicion].ciudades;


    }
  
    








    //------FILTRAR POR CIUDAD----//
    seleccionarCiudad( ciudad:string ){
       
      this.nombreCiudad = ciudad;// nombre de la ciudad en la descripcion
      
      this.ciudad = ciudad;

      if(ciudad == "todos"){

        this.nombreCiudad = 'colombia';// nombre de la ciudad en la descripcion
        this.ciudad = "";
      }
      
       // funcion que tiene la peticion a servicios http
      this.peticionDaseDatos(this.comida, this.departamento, this.ciudad);

    }








    

    //--------------ENVIAR AL SERVICIO PARA CONSULTA------------//
    peticionDaseDatos(comida:any, departamento:any, ciudad:any ){
        
      this.conectarServicio.filtrarRestaurantes(comida, departamento, ciudad)
        .subscribe( (resp:any) => {
          
          this.guardarResturantesDB = resp.respDB;
          console.log(resp);

          //mostrar restaurantes
          this.contenedorCardsRestaurantes = true;

          //ocultar alerta de no enonctrados
          this.noHayCategoria = false;


        }, (err => {
          console.log(err.error.mensaje)
          
          //ocultar restaurantes
          this.contenedorCardsRestaurantes = false;


          // mostrar alerta de no encontrados
          this.noHayCategoria = true;

        }))

  }



      
    cerrarModalSession(){
      
      this.modalIniciarSession = false;
      
    }





    /*---------------------FAVORITOS-------------------*/
    agregarFavoritos( data:any, i:number ){

      //console.log(data)
      
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
                    }).then( () => {
                      localStorage.setItem('favorito','true');
                      this.usarRuta.navigate(["/perfil", localStorage.getItem('email')] )
                    })
              
                    
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




    //----------------------VER EL RESTAURANTE---------------------  
    verRestaurante(datosREST:any, id:any){

    
      this.usarRuta.navigate([ '/restaurante', id ])

      localStorage.setItem( 'id', id );
      localStorage.setItem( 'emailREST', datosREST.email )
      
    }







    





    /*--
    borrarCategoria( i:any ){

          $(`#favorito${i}`).css('display', 'block');
          $(`#favoritoH${i}`).css('display', 'none');

    }
    --*/



             
  
   


    
    
}
