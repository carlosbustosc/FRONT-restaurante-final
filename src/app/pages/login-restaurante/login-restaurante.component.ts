import { Component } from '@angular/core';

/*---importar formgroup---*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: 'app-login-restaurante',
  templateUrl: './login-restaurante.component.html',
  styleUrls: ['./login-restaurante.component.css']
})
export class LoginRestauranteComponent {

  loginRestaurante:FormGroup;

  constructor(private fb:FormBuilder ){

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

      console.log(this.loginRestaurante);
    
    }
  }


}

