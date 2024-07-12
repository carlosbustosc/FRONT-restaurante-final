import { Component } from '@angular/core';

/*---importar formgroup---*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*--------------conectar servicios-----------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';

/*-----------usar ruta------------*/
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-restaurante',
  templateUrl: './login-restaurante.component.html',
  styleUrls: ['./login-restaurante.component.css']
})
export class LoginRestauranteComponent {

  loginRestaurante:FormGroup;

  constructor(private usarRuta:Router, private fb:FormBuilder, private conectarServicio:RestauranteService ){

    this.loginRestaurante = this.fb.group({

      usuario: ["", Validators.required ],
      pass :   ["", Validators.required ]

    })

  }


  errorUsuario(){

    return this.loginRestaurante.controls['usuario'].invalid && this.loginRestaurante.controls['usuario'].touched
  }

  errorPass(){

    return this.loginRestaurante.controls['pass'].invalid && this.loginRestaurante.controls['pass'].touched
  }



  ingresarUsuarioRest(){

    if( this.loginRestaurante.invalid ){

      Object.values( this.loginRestaurante.controls ).forEach( resp => {

        resp.markAsTouched();

      })

    }else{

      let correo =  this.loginRestaurante.controls['usuario'].value;
      let pass   =  this.loginRestaurante.controls['pass'].value;

      console.log(pass)

      this.conectarServicio.loginRestaurante( correo, pass )
          .subscribe( (resp:any) => {
            console.log(resp);


            localStorage.setItem('idRestaurante', resp.DatosPerfil._id );
            localStorage.setItem('nombreRestaurante', resp.DatosPerfil.nombreRestaurante );
            localStorage.setItem('foto', resp.DatosPerfil.foto );
            localStorage.setItem('email', resp.DatosPerfil.email );
            
            this.usarRuta.navigate(['/internaRestaurante'])
            
          
          }, ( error ) => {
              
            console.log(error);

              Swal.fire({
                icon: "error",
                title: "Ups",
                text: error.error.mensaje,                
              });
          })

          /*--retornar informacion --*/
          /*-----Mandar a storage--*/

    }
  }


}

