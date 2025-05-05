import { Component, OnInit } from '@angular/core';


/*---importar form group---*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*----conectar servicios----*/
import { RestauranteService } from 'src/app/services/restaurante.service';


import Swal from 'sweetalert2';

//usar router
import { Router } from "@angular/router"


@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})


export class RegistroClienteComponent implements OnInit {
  

  departamentos:any = [];
  ciudades:any = [];
  formularioCliente:FormGroup
  
  constructor(private usarRuta:Router, private fb: FormBuilder, private conectarServicio:RestauranteService ){
  
    this.formularioCliente = this.fb.group({

      nombre :   ["",  Validators.required ],
      email  :   ["", Validators.required  ],
      pass   :   ['', Validators.required  ],
      pass2  :   ['', Validators.required  ],
      celular :  ['', Validators.required  ],
      departamento: ['', Validators.required],
      ciudad :   ['', Validators.required  ],
      barrio:    ['', Validators.required  ],
      direccion: ['', Validators.required  ],
    
    })

  }
  


  ngOnInit(): void {
    
    this.conectarServicio.ciudades()
        .subscribe( (resp:any) => {
          
          this.departamentos = resp;
          //console.log( resp[1].ciudades );
        
        })
    
  }


  /*---validaciones---*/
  nombreError(){
    return this.formularioCliente.controls['nombre'].invalid && this.formularioCliente.controls['nombre'].touched;
  }

  emailError(){
  
    return this.formularioCliente.controls['email'].invalid && this.formularioCliente.controls['email'].touched; 

  }

  passError(){

    return this.formularioCliente.controls['pass'].invalid && this.formularioCliente.controls['pass'].touched;
  
  }

  pass2Error(){
    
    var pass1 = this.formularioCliente.controls['pass'].value;
    var pass2 = this.formularioCliente.controls['pass2'].value;

    if( pass1 == pass2 ){
      
      return false;
    
    }else{

      return true;
    
    }
    
  
  }
  
  celularError(){

    return this.formularioCliente.controls['celular'].invalid && this.formularioCliente.controls['celular'].touched;
  
  }

  ciudadError(){

    return this.formularioCliente.controls['ciudad'].invalid && this.formularioCliente.controls['ciudad'].touched;
  }


  barrioError(){

    return this.formularioCliente.controls['barrio'].invalid && this.formularioCliente.controls['barrio'].touched;
  
  }

  direccionError(){
  

    return this.formularioCliente.controls['direccion'].invalid && this.formularioCliente.controls['direccion'].touched;
  }







  /*---seleccion departamento que genera las ciudades---*/
  seleccionDepartamento( departamentoValue:any ){
      
    console.log( departamentoValue );
    
    /*--cargar ciudades--*/
    this.ciudades = this.departamentos[ departamentoValue ].ciudades;
    console.log(this.ciudades);

  }





  /*----boton_registrar----*/
   registrarCliente(){
    
    console.log( this.formularioCliente );

    if( this.formularioCliente.invalid ){

      Object.values( this.formularioCliente.controls ).forEach( values => {
        
          values.markAsTouched();

      })

    }else{
  
      console.log( this.formularioCliente );
      /*---conectar servicio---*/

      this.conectarServicio.registrarClientes( this.formularioCliente )
          .subscribe( resp => {
            console.log( resp );
            
            Swal.fire({
              title: "Se ha registrado correctamente!",
              text: "Inicie session para ver su perfil y agendar domicilios!",
              icon: "success"
            });
            this.formularioCliente.reset()
             
            this.usarRuta.navigate(['/loginCliente']);
           
          })

    }

   }





}
