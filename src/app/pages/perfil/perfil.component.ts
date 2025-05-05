import { Component, OnInit } from '@angular/core';

/*----usar form group---*/
import { FormGroup, FormBuilder } from '@angular/forms'


/*--------conectar servicios---------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------recibir parametro-----------*/
import { Router, ActivatedRoute } from '@angular/router'

import Swal from 'sweetalert2';

import { interval } from "rxjs"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})




export class PerfilComponent implements OnInit {
  
  ciudadPerfil:any = ""

  UnFavorito:boolean = false
  unFavoritoObjeto:any = {}
  
  respuesta:any

  guardarArregloCliente:any = {};

  formActualizacion:FormGroup;
  guardarDepartamentos:any = []

  guardarCiudades:any = []

  numeroDepart:any;
  ciudadPorDefecto:any;

  parametroURL:any;
  
  guardarDomiciliosAgendados:any = []

  guardarRestaurantesFavoritos:any = []

  /*---pantallas----*/
  pantallaInformacion = true;
  pantallaDomicilios  = false;
  pantallaFavoritos = false;

  /*----nombre persona perfil------*/
  nombrePersonaPerfil:any
  agendado:any;

  noAgendados = false;

  guardarImagen:any;

  guardarImagenPerfil:any; 


  num1 = 0


  noPedidos = true;
  noRestaurantes = true;
  

  constructor(private usarRuta:Router, private conectarServicios:RestauranteService, private fb:FormBuilder, private recibirParametro:ActivatedRoute){

    
    /*---recibir parametro---*/
    this.recibirParametro.params.subscribe( resp => {
    this.parametroURL = resp['email'];
    
    })


  
      this.formActualizacion = this.fb.group({
        nombre:             this.guardarArregloCliente.nombre,
        email:              this.guardarArregloCliente.email,
        pass:               this.guardarArregloCliente.pass,
        celular:            this.guardarArregloCliente.celular,
        departamento:       this.guardarArregloCliente.departamento,
        ciudad:             this.guardarArregloCliente.ciudad,
        barrio:             this.guardarArregloCliente.barrio,
        direccion:          this.guardarArregloCliente.direccion
      
      })
  
  }


  ngOnInit(): void {


        this.conectarServicios.cargarImagenPerfil( localStorage.getItem('email') )
            .subscribe( (resp:any) => {
          
              console.log(resp)
        
              this.guardarImagenPerfil = resp.datosFoto.fotoF 
              //console.log(this.guardarImagenPerfil)

            }, (err => {
              
              // si no hay un registro de foto toca una predeterminada
              if(err.error.mensaje){

                this.guardarImagenPerfil =  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              
              }

            }))
             
      //-------verificar si se carga por defecto la pantalla favoritos-----//
      



      /*---ciudad de la persona--*/
      this.ciudadPerfil = localStorage.getItem('ciudad')
             
      
      /*----traer nombre de la persona si esta en local storage---*/
      this.nombrePersonaPerfil = localStorage.getItem('nombre');

      
      /*-----traer si esta agendado----*/
      this.agendado = localStorage.getItem('ValorAgendado');
      //console.log( this.agendado );

      if( this.agendado ){
        

        // cuando se registra un restaurante favorito
        if( localStorage.getItem('favorito') ){
          
          this.pantallaInformacion = false;
          this.pantallaDomicilios  = false;
          this.pantallaFavoritos = true;
          this.verFavoritos();

          setTimeout( function() {
            localStorage.removeItem('favorito');
          }, 2000)
        
        // cuando se registra un domicilio
        }else if( localStorage.getItem('docimilio') ){
          
          this.pantallaInformacion = false;
          this.pantallaDomicilios  = true;

          setTimeout( function() {
            localStorage.removeItem('docimilio');
          }, 2000)

        }

       
       
      }else{
    
        this.pantallaInformacion = true;

      }





       /*---traer un cliente---*/
       this.conectarServicios.traerUnUsuario( this.parametroURL )
       .subscribe( (resp:any) => {
          
        console.log(resp)
          /*---funcion llenar formulario pasando la data---*/
            this.llenarFormulario( resp )
            //this.pantallaInformacion = true;
            

            //cargar combo de ciudades
            this.numeroDepart = resp.datosPerfil.departamento


       })






    /*--------------cargar domicilios agendados------------*/
    let correoPerfil = localStorage.getItem('email')

    this.conectarServicios.traerDomiciliosAgendados( correoPerfil  )
    .subscribe( (resp:any) => {
           
      console.log(resp.datos_perfil)
          
          if(resp.datos_perfil.length == 0){
           
            this.noPedidos = true;
          
          }else{
              
             //console.log( resp.datos_perfil )
            this.guardarDomiciliosAgendados = resp.datos_perfil;
            this.noPedidos = false
            //console.log( this.guardarDomiciliosAgendados );

          }

         
          
        },)
        


    
  


  }






  /*--------------llenando campos------*/
  llenarFormulario(form:any){
    
    console.log( form.datosPerfil.departamento )
    

    this.formActualizacion = this.fb.group({
      nombre:             form.datosPerfil.nombre,
      email:              form.datosPerfil.email,
      pass:               form.datosPerfil.pass,
      celular:            form.datosPerfil.celular,
      departamento:       form.datosPerfil.departamento,
      ciudad:             form.datosPerfil.ciudad,
      barrio:             form.datosPerfil.barrio,
      direccion:          form.datosPerfil.direccion
    
    })

    /*---guardar departamento---*/
    this.numeroDepart    = form.departamento;

    /*---guardar ciudad---*/
    this.ciudadPorDefecto = form.ciudad;



    /*----conectar servicios trear ciudades por defecto---*/
    this.conectarServicios.ciudades()
    .subscribe( (resp:any) => {
      console.log( resp );

      this.guardarDepartamentos = resp;
      this.guardarCiudades      = resp[this.numeroDepart].ciudades 
    })



  }





  /*--traer cidades por change---*/
  selecDepartamento(value:any){


    this.conectarServicios.ciudades()
    .subscribe( (resp:any) => {
      console.log( resp );

      this.guardarCiudades      = resp[value].ciudades 
    })

  }





  actualizarInformacion(){
    
    //console.log( this.formActualizacion.value );
    
    this.conectarServicios.actualizarDatos( this.formActualizacion.value )
        .subscribe( resp => {
          
          console.log( resp );

          setTimeout( function(){
            
            Swal.fire({
              title: "Muy bien!",
              text: "se Ha actualizado correctemente!",
              icon: "success"
            });

          }, 500)
          
        }, (error) => {

          console.log(error)
        
        })

  }





  verInformacion(){

    this.pantallaInformacion = true;
    this.pantallaDomicilios  = false;
    this.pantallaFavoritos = false;

  }

  verDomicilios( domicilios:any ){
    
    this.pantallaInformacion = false;
    this.pantallaDomicilios  = true;
    this.pantallaFavoritos = false;
    
    console.log(domicilios)
  
      /*----verificar si existe domicilios---*/
      if( typeof domicilios == "object" && domicilios !== null && Array.isArray(domicilios) ){
        
       
        this.pantallaDomicilios = true;
        this.noAgendados = false;
  
      }else{
          
        this.noAgendados = true;
        this.pantallaDomicilios = false;
  
      }
       /*----verificar domicilios---*/


  }

  verFavoritos(){
    
    this.pantallaInformacion = false;
    this.pantallaDomicilios  = false;
 


    /*-----------cargar restaurantes favoritos--------*/
     this.conectarServicios.cargarRestaurantesFavoritos( localStorage.getItem( 'email' ) )
        .subscribe( (resp:any) => {

          this.respuesta = resp.usuarioDB
          this.noRestaurantes = false;
          //console.log( this.respuesta );// solo TRAE 1
          

          if(resp.usuarioDB.length == 0){
            this.noRestaurantes = true;
          }

          // comprueba que sea un objeto             // comprueba que sno sea null    // comprueba que no sea un array
          if (typeof this.respuesta  === 'object' && this.respuesta  !== null   &&   !Array.isArray( this.respuesta ) ) { // 
          //console.log("La respuesta es un objeto");


          this.UnFavorito = true;
          this.unFavoritoObjeto = this.respuesta;
          console.log( this.unFavoritoObjeto )
          

        } else {
          
            this.pantallaFavoritos = true;
            this.unFavoritoObjeto  = this.respuesta
            
            console.log( this.unFavoritoObjeto._id )
            //console.log("La respuesta no es un objeto");
            

        }
          //this.guardarRestaurantesFavoritos = resp
       
        })
  }

  

  irAlRestaurante( idRestaurante:any ){
  
  
    //console.log('restaurante/' + idRestaurante)
    this.usarRuta.navigate(['restaurante/', idRestaurante]);


  }


  CancelarPedido( id:any ){
    
    //console.log( id._id )
    Swal.fire({
      title: "Esta seguro?",
      text: "¿Desea Cancelar el pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar!"
    
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.conectarServicios.borrarPedido( id._id )
        .subscribe( resp => {

            console.log(resp);
        })

        Swal.fire({
          title: "Muy bien!",
          text: "Ya no se le notificara al restaurante sobre tu pedido.",
          icon: "success"
        
        }).then( () => {
            

          setTimeout(() => {
            window.location.reload();
          

          }, 1000); // 30000 ms = 30 segundos

        })

      }

    });

    
  }






  irAlRestauranteFavorito( visitar:any ){

      this.usarRuta.navigate(['restaurante/', visitar])
  }


  borrarFavorito( id:any ){
    
    console.log(id)
    
    //console.log( id._id )
    Swal.fire({
      title: "Esta seguro?",
      text: "¿Desea borrar este favorito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar favorito!"
    }).then((result) => {


      if (result.isConfirmed) {
        
      //Borrar favorito d ela DB
      this.conectarServicios.borrarFavoritos( id )
      .subscribe( resp => {

        console.log(resp);
      })

        Swal.fire({
          title: "Muy bien!",
          text: "Se ha borrado este restaurante de tu perfil",
          icon: "success"
        }).then( () => {

          setInterval(() => {
            window.location.reload();
          }, 1000); // 30000 ms = 30 segundos

        })

      }

    });

  }



   /*----subir imagen------*/
   subirImagen( imagen:any){
    
    console.log(imagen.target.files[0]); 
    
    let archivoIMG = imagen.target.files

    let reader = new FileReader()
    reader.readAsDataURL( archivoIMG[0] );
    
    reader.onloadend = () => {
        //console.log(reader.result);
        this.guardarImagen = reader.result

         /*-------subir imagen-------*/
         this.conectarServicios.guardarFotoPerfil( this.guardarImagen, localStorage.getItem('email') )
         .subscribe( ( resp:any ) => {
          
          setInterval(() => {
            window.location.reload();
          }, 2000); // 30000 ms = 30 segundos

          //alert( resp.mensaje )
 
         })
        /*-------subir imagen-------*/
       
      
    }
    

  



    
   }

}
