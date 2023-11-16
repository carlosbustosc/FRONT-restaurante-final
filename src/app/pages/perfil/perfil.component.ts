import { Component, OnInit } from '@angular/core';

/*----usar form group---*/
import { FormGroup, FormBuilder } from '@angular/forms'


/*--------conectar servicios---------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------recibir parametro-----------*/
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})




export class PerfilComponent implements OnInit {

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

  guardarImagen:any[] = [];

  guardarImagenPerfil:any[] = []

  num1 = 0
  

  constructor(private usarRuta:Router, private conectarServicios:RestauranteService, private fb:FormBuilder, private recibirParametro:ActivatedRoute){

    
    /*---recibir parametro---*/
    this.recibirParametro.params.subscribe( resp => {
      this.parametroURL = resp['id'];

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

    
        this.conectarServicios.cargarImagenPerfil( localStorage.getItem('correo') )
            .subscribe( (resp:any) => {
             

              this.guardarImagenPerfil = resp 

              console.log(this.guardarImagenPerfil)

            })





      /*----traer nombre de la persona si esta en local storage---*/
      this.nombrePersonaPerfil = localStorage.getItem('nombre');

      
      /*-----traer si esta agendado----*/
      this.agendado = localStorage.getItem('ValorAgendado');
      console.log( this.agendado );

      if( this.agendado ){


        this.pantallaDomicilios  = true;
        this.pantallaInformacion = false;

        
      }else{

        this.pantallaInformacion = true;

      }


       /*---traer un cliente---*/
       this.conectarServicios.traerUnUsuario( this.parametroURL )
       .subscribe( resp => {
  
          /*---funcion llenar formulario pasando la data---*/
            this.llenarFormulario( resp )

       })





    /*--------------cargar domicilios agendados------------*/
    let correoPerfil = localStorage.getItem('correo')

    this.conectarServicios.traerDomiciliosAgendados( correoPerfil  )
        .subscribe( resp => {
         
          console.log(resp)

          this.guardarDomiciliosAgendados = resp;
          console.log( this.guardarDomiciliosAgendados );
          
        },)


    
  
     /*-----------cargar restaurantes favoritos--------*/
     this.conectarServicios.cargarRestaurantesFavoritos()
        .subscribe( (resp:any) => {

          console.log( resp );
          this.guardarRestaurantesFavoritos = resp
       
        })


  }






  /*--------------llenando campos------*/
  llenarFormulario(form:any){

    this.formActualizacion = this.fb.group({
      nombre:             form.nombre,
      email:              form.email,
      pass:               form.pass,
      celular:            form.celular,
      departamento:       form.departamento,
      ciudad:             form.ciudad,
      barrio:             form.barrio,
      direccion:          form.direccion
    
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
    
    console.log( this.formActualizacion.value );
    
    this.conectarServicios.actualizarDatos( this.formActualizacion.value )
        .subscribe( resp => {
          
          console.log( resp );

          setTimeout( function(){
            alert('se Ha actualizado correctemente');
          }, 500)
          

        } )

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


      /*----verificar si existe domicilios---*/
      
      if( domicilios.length > 0){
        
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
    this.pantallaFavoritos   = true;
  }

  

  irAlRestaurante( idRestaurante:any ){

    //console.log('restaurante/' + idRestaurante)
    this.usarRuta.navigate(['restaurante/', idRestaurante]);


  }


  CancelarPedido( id:any ){
    

    if (window.confirm("¿Desea Cancelar el pedido?")) {
      
      this.conectarServicios.borrarPedido( id.idDomicilio )
      .subscribe( resp => {
        console.log(resp);
      })

    }else{
      alert("Puede serguir con su pedido")
      
    }

  }






  irAlRestauranteFavorito( visitar:any ){

      this.usarRuta.navigate(['restaurante/', visitar])
  }


  borrarFavorito( id:any ){

    if (window.confirm("¿Desea borrar este favorito?")) {
      
      this.conectarServicios.borrarFavoritos( id )
      .subscribe( resp => {
        console.log(resp);
      })

    }else{
      alert("Puede serguir con su archivo")
      
    }

  
  }


   /*----subir imagen------*/
   subirImagen( imagen:any){
    
    console.log(imagen.target.files[0]); 
    
    let archivoIMG = imagen.target.files

    let reader = new FileReader()
    reader.readAsDataURL( archivoIMG[0] );
    
    reader.onloadend = () => {
        //console.log(reader.result);
        this.guardarImagen.push(reader.result);
    }
    
     console.log(this.guardarImagen);
  


    
    
    


     /*-------subir imagen-------*/
        this.conectarServicios.guardarFotoPerfil( this.guardarImagen, localStorage.getItem('correo') )
          .subscribe( resp => {
           console.log( resp )
  
        })

 
    
    
   }

}
