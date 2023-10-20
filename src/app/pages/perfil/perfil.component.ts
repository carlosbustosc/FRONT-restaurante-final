import { Component, OnInit } from '@angular/core';

/*----usar form group---*/
import { FormGroup, FormBuilder } from '@angular/forms'


/*--------conectar servicios---------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------recibir parametro-----------*/
import { ActivatedRoute } from '@angular/router'


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

  

  constructor(private conectarServicios:RestauranteService, private fb:FormBuilder, private recibirParametro:ActivatedRoute){

    
    /*---recibir parametro---*/
    this.recibirParametro.params.subscribe( resp => {
      this.parametroURL = resp['id'];

    })


     /*---traer un cliente---*/
     this.conectarServicios.traerUnUsuario( this.parametroURL )
     .subscribe( resp => {

        /*---funcion llenar formulario pasando la data---*/
          this.llenarFormulario( resp )

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


  ngOnInit(): void {}


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
  

}
