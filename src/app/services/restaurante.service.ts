import { Injectable } from '@angular/core';


/*----importar HttpClient---*/
import { HttpClient } from "@angular/common/http";

/*---importar map---*/
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class RestauranteService {


  correoStorage:any = "";
  passStorage:string = ""

  constructor(private usarHttp:HttpClient ) { 

    /*----validar que este el correo --*/
    this.leerCorreo();
 
  }


  /*----importar ciudades---*/
  ciudades(){

    return this.usarHttp.get('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
    
  }


  /*--------------registro de clientes-----------*/
  registrarClientes( formularioCliente:any ){
    
    const formCliente = {

      nombre    : formularioCliente.value.nombre,
      email     : formularioCliente.value.email,
      pass      : formularioCliente.value.pass,
      pass2     : formularioCliente.value.pass2,
      celular   : formularioCliente.value.celular,
      departamento: formularioCliente.value.departamento,
      ciudad    : formularioCliente.value.ciudad,
      barrio    : formularioCliente.value.barrio,
      direccion : formularioCliente.value.direccion 

    }


    return this.usarHttp.post('https://restaurante-15f7b-default-rtdb.firebaseio.com/registroCliente.json', formCliente )
            .pipe(
              map( (resp:any) => {

                return resp.id;
              
              })
            )

  }


  


  /*-----------ingreso de clientes------------*/
  loginClientes( formLoginCliente:any ){

    const infoLoginClientes = {

      usuario: formLoginCliente.controls['usuario'].value,
      password: formLoginCliente.controls['password'].value

    }

    return this.usarHttp.get('https://restaurante-15f7b-default-rtdb.firebaseio.com/registroCliente.json')
                        .pipe(
                          map( resp => {
  
                            /*----creamos el arreglo nuevo----*/
                            const clienteArr:any = [];
  
                            Object.values( resp ).forEach( respDatos => {
  
                              let todosLosDatos   = respDatos;//traemos todos los datos de la base
                              let todosLosCorreos = todosLosDatos.email;// traemos solo los email
  
                              if( todosLosCorreos.indexOf( formLoginCliente.controls['usuario'].value ) >= 0){//comprobamos si esta el email
                                
                                clienteArr.push( todosLosDatos );
  
                              }
                      
                            })
  
                            
                            //Validacion de correo y contraseña
                            var pass   = formLoginCliente.controls['password'].value;
  
                            if(clienteArr.length > 0){//validamos que exista el correo
  
                                console.log("el correo existe");
                              
                                /*----validar contraseña---*/
                                if(pass == clienteArr[0].pass){
  
                                  console.log("se ha validado correctamente");
  
                                  this.correoStorage = clienteArr[0].email;
                                  localStorage.setItem('correo', this.correoStorage);
                                  
                                  return clienteArr
  
                                }else{
  
                                  alert('la contraseña no es correcta');
  
                                }
                                /*----validar contraseña---*/
                            
                            }else{
  
                              alert("no existe el correo")
                              
                            }
  
                          
                          })
  
                        )
    
    }
    

    /*---Leer que exista el correo e local storage---*/
    leerCorreo(){

      if( localStorage.getItem('correo') ){
        
        this.correoStorage = localStorage.getItem('correo');
        //alert(this.correoStorage);

      }else{

        this.correoStorage = ""
      
      }

    }


      
    /*-----validar que el correo sea mayor a 2 en el guard ---true---*/
    validarCorreo(){
      
      return this.correoStorage.length > 2;

    }


    /*-------------------------------------fin ingreso de clientes-----------------------------*/







    /*--------------------------Registro de resturantes------------------------*/

    registrarRestaurantes( formularioRestaurante:any ){

      const registroRestaurante = {

        nombreRestaurante:  formularioRestaurante.nombreRestaurante,
        foto:               formularioRestaurante.foto,
        descripcion:        formularioRestaurante.descripcion,
        departamento:       formularioRestaurante.departamento,
        ciudad:             formularioRestaurante.ciudad,
        direccion:          formularioRestaurante.direccion,
        Telefono:           formularioRestaurante.Telefono,
        email :             formularioRestaurante.email,
        pass:               formularioRestaurante.pass,
        categoria :         formularioRestaurante.categoria,
        platosEspeciales:   formularioRestaurante.platosEspeciales,
        bebidas:            formularioRestaurante.bebidas,
        entradas:           formularioRestaurante.entradas,

      }

      return this.usarHttp.post('https://restaurante-15f7b-default-rtdb.firebaseio.com/registroRestaurante.json', registroRestaurante);

    }



     /*--------------------------fin Registro de resturantes------------------------*/






    /*-----------------------------Filtrar Restaurantes-------------------------*/
    filtrarRestaurantes(city:any){

      if(city == "todos"){

        return this.usarHttp.get('https://restaurante-15f7b-default-rtdb.firebaseio.com/registroRestaurante.json')
               .pipe(
                map( (resp:any) => {

                  let arrNuevo:any = [];

                  Object.keys( resp ).forEach( llaves => {

                    let todos = resp[llaves]
                    //console.log(todos);
                    
                    arrNuevo.push(todos); 
                  })
                  
                  return arrNuevo; 
                
                })
               
                )

      }else{

        return this.usarHttp.get('https://restaurante-15f7b-default-rtdb.firebaseio.com/registroRestaurante.json')
             .pipe(
              map( (resp:any) => {

                  /*---creamos un arreglo---*/
                  const arrRestaurante:any = [];

         
                  /*-------obtener LLaves y poner ID-----*/
                  Object.keys( resp ).forEach( llaves => {

                    let userKey = resp[llaves]/*---ingresar al objeto.llaves---*/
                    userKey.id = llaves;

                  })
          
                  /*----filtrar ciudad---*/
                  Object.values( resp ).forEach( (respRest:any) => {

                    //console.log( respRest.ciudad );
                    let todosLosRestaurantes = respRest;
                    let ciudadesRestaurantes = todosLosRestaurantes.ciudad;

                    if( ciudadesRestaurantes.indexOf( city ) >= 0 ){

                      arrRestaurante.push( todosLosRestaurantes );
                      
                    }
                    
                  })

                  
                  return arrRestaurante

              })
             
              )


      }
      
    }


    /*-----------------------------fin Filtrar Restaurantes-------------------------*/










    /*---------------------------traer Un Restaurante---------------------------*/
    traerUnRestaurante( parametroID:any ){

      return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/registroRestaurante/${ parametroID }.json`);

    }







    /*---------------------cerrar session----------------------*/
    cerrarSession(){

      localStorage.removeItem('correo');
      localStorage.removeItem('departamento');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('nombre');


    }



}
