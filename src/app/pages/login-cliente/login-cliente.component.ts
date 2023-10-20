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
              localStorage.setItem('barrio',       resp[0].barrio)
              localStorage.setItem('celular',      resp[0].celular)
              localStorage.setItem('ciudad',       resp[0].ciudad)
              localStorage.setItem('departamento', resp[0].departamento)
              localStorage.setItem('direccion',    resp[0].direccion)
              localStorage.setItem('email',        resp[0].email );
              localStorage.setItem('idPersona',    resp[0].idPersona );
  
              localStorage.setItem('nombre',       resp[0].nombre );
              localStorage.setItem('pass',         resp[0].pass );
              localStorage.setItem('pass2',        resp[0].pass2 );


              /*----guardar local storage---*/           

              
              if( localStorage.getItem('id') ){
                
                this.usarRuta.navigate(['/restaurante', localStorage.getItem('id')]); //direccionar a la pagina de ingreso

              }else{

                this.usarRuta.navigate( ['inicio'] ); //direccionar a la pagina de ingreso
                
              }

              
              

            })
      
      }

    }

  }
