import { Component, OnInit } from '@angular/core';

/*---usar FromGroup-----*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*----conectar servicios-----*/
import { RestauranteService } from 'src/app/services/restaurante.service';

/*---usar ruta---*/
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})

export class LoginClienteComponent implements OnInit {

  loginCliente:FormGroup;

  constructor(private fb:FormBuilder, private conectarServicio:RestauranteService, private usarRuta: Router ){

    this.loginCliente = this.fb.group({

      usuario:  ["", Validators.required ],
      password: ["", Validators.required ]

    })

  }


  ngOnInit(): void {
    
  }


  /*---validaciones visuales---*/
  usuarioError(){

    return this.loginCliente.controls['usuario'].invalid && this.loginCliente.controls['usuario'].touched;
  
  }

  passwordError(){

    return this.loginCliente.controls['password'].invalid && this.loginCliente.controls['password'].touched;
  
  }



  /*---boton de ingreso---*/
    ingresarCliente(){

      if( this.loginCliente.invalid ){

        Object.values( this.loginCliente.controls ).forEach( valores => {

          valores.markAsTouched();

        })

      }else{

        //console.log(this.loginCliente.controls['usuario'].value);
        //console.log(this.loginCliente.controls['password'].value);

        this.conectarServicio.loginClientes( this.loginCliente )
            .subscribe( resp => {
              console.log(resp);
              
              /*----guardar local storage---*/
              localStorage.setItem('departamento', resp[0].departamento)
              localStorage.setItem('ciudad', resp[0].ciudad)   
              localStorage.setItem('nombre', resp[0].nombre );
              /*----guardar local storage---*/           


              this.usarRuta.navigate(['/restaurantes']); //direccionar a la pagina de ingreso

            })
      
      }

    }

  }
