import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

/*-----conectar servicios-----*/
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css']
})


export class RegistroRestauranteComponent implements OnInit {

  cargarDepartamentos:any = [];
  city:any;

  guardarImagen:any[] = [];
  formRestaurante:FormGroup;

  verFormComidas = false;
  verFormDatos = true;


  constructor( private fb:FormBuilder, private conectarServicios: RestauranteService ){

      this.formRestaurante = this.fb.group({
        nombreRestaurante:   ["", Validators.required ],
        foto:                [ this.guardarImagen ],
        descripcion:         ["", Validators.required ],
        departamento:        ["", Validators.required ],
        ciudad:              ["", Validators.required ],
        direccion:           ["", Validators.required ],
        Telefono:            ["", Validators.required ],
        email :              ["", Validators.required ],
        pass:                ["", Validators.required ],
        categoria:           ["", Validators.required ],
       

        platosEspeciales: this.fb.array([
          
        ]),

        bebidas: this.fb.array([
          
        ]),

        entradas: this.fb.array([

        ])

      })
  }

  ngOnInit(): void {

    this.conectarServicios.ciudades()
        .subscribe( (resp:any) => {

          this.cargarDepartamentos = resp;

        })

  }

  /*----------------validaciones------------------*/
  errorNombreRestaurante(){
    return this.formRestaurante.controls['nombreRestaurante'].invalid && this.formRestaurante.controls['nombreRestaurante'].touched
  }

  errorFotoRestaurante(){

    return this.formRestaurante.controls['foto'].invalid && this.formRestaurante.controls['foto'].touched
  }

  errorDescripcion(){
    return this.formRestaurante.controls['descripcion'].invalid && this.formRestaurante.controls['descripcion'].touched
  }

  errorDeparmento(){
    return this.formRestaurante.controls['departamento'].invalid && this.formRestaurante.controls['departamento'].touched
  }

  errorCiudad(){
    return this.formRestaurante.controls['ciudad'].invalid && this.formRestaurante.controls['ciudad'].touched
  }

  errorDireccion(){
    return this.formRestaurante.controls['direccion'].invalid && this.formRestaurante.controls['direccion'].touched
  }

  errorEmail(){
    return this.formRestaurante.controls['email'].invalid && this.formRestaurante.controls['email'].touched
  }

  errorPass(){
    return this.formRestaurante.controls['pass'].invalid && this.formRestaurante.controls['pass'].touched
  }

  errorTelefono(){
    return this.formRestaurante.controls['Telefono'].invalid && this.formRestaurante.controls['Telefono'].touched
  }
  

  platosEspeciales(){
    return this.formRestaurante.controls['platosEspeciales'].invalid && this.formRestaurante.controls['platosEspeciales'].touched

  }

  platosCategoria(){
    return this.formRestaurante.controls['categoria'].invalid && this.formRestaurante.controls['categoria'].touched

  }
  /*---------------------fin validaciones------------------*/
 



  /*-----------------------ARRAYS -----------------------*/
  get especiales(){
    return this.formRestaurante.get('platosEspeciales') as FormArray
  }

  get bebidas(){
    return this.formRestaurante.get('bebidas') as FormArray
  }

  get entradas(){
    return this.formRestaurante.get('entradas') as FormArray
  }





  /*---agregar comida especial----*/
  agregarEsepciales(){
    this.especiales.push( this.fb.control( 'Bandeja paisa - $20.000' ) )
  }
  agregarBebida(){
    this.bebidas.push( this.fb.control( 'limonada - $5.000' ) )
  }
  agregarEntrada(){
    this.entradas.push( this.fb.control( 'nachos - $10.000' ) )
  }
   /*-----------------------FIN ARRAYS -----------------------*/






  /*----------------borrar Array----------------*/
  borrar_especial(i:number){

    this.especiales.removeAt(i);
  }

  borrar_bebida(i:number){
    this.bebidas.removeAt(i);

  }

  borrar_Entradas(i:number){

    this.entradas.removeAt(i);
  }



  /*----------------borrar Array----------------*/




    /*---subir imagen---*/
   subirImagen( imagen :any){

    console.log(imagen.target.files[0]); 

    let archivoIMG = imagen.target.files

    let reader = new FileReader()
    reader.readAsDataURL( archivoIMG[0] );
    reader.onloadend = () => {
        console.log(reader.result);
        this.guardarImagen.push(reader.result);
    }

   }

   
   /*--------fin subir imagen--------*/


   /*---------seleccionar ciudades----------*/
   departa(i:any){

    this.city = this.cargarDepartamentos[i].ciudades;
    console.log( this.cargarDepartamentos[i].ciudades )

   }





   /*--------botones--------*/
   Siguiente(){

    this.verFormComidas = true;
    this.verFormDatos   = false;

   }

   volver(){

    this.verFormComidas = false;
    this.verFormDatos   = true;

   }
   /*--------fin botones--------*/






  registrarRestaurante(){

    console.log(this.formRestaurante.value)

    if( this.formRestaurante.invalid ){

        Object.values( this.formRestaurante.controls ).forEach( resp => {

          resp.markAsTouched();
          this.verFormComidas = false;
          this.verFormDatos   = true;

        })

    }else{
      
      this.conectarServicios.registrarRestaurantes( this.formRestaurante.value )
                          .subscribe( (resp:any) => {
                            
                            console.log(resp);
                            alert("se ha resgitrado correctamente");
                            /*---reset formulario---*/
                            this.formRestaurante.reset();
                            location.reload();
                          
                          })


    }

  }

}
