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

  guardarCorreo:any = ""


  
  constructor(private usarHttp:HttpClient ) { 

  /*----validar que este el correo --*/
    this.leerCorreo();
    this.leerCorreoAlCargar()

   
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
                          map( (resp:any) => {
  
                            /*----creamos el arreglo nuevo----*/
                            const clienteArr:any = [];

                            Object.keys( resp ).forEach( llaves => {

                              let accederObjSinLLaves = resp[llaves];
                              accederObjSinLLaves.idPersona = llaves

                            })
  
                            Object.values( resp ).forEach( (respDatos:any) => {
  
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
                    todos.id = llaves;
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

      localStorage.removeItem('categoria');

      localStorage.removeItem('barrio');

      localStorage.removeItem('direccion');
      localStorage.removeItem('id');

      localStorage.removeItem('idPersona');
      localStorage.removeItem('celular');
      localStorage.removeItem('email');

      localStorage.removeItem('pass');
      localStorage.removeItem('pass2');

      localStorage.removeItem('ValorAgendado')
    

      /*---resturante---*/
      localStorage.removeItem('nombreRestaurante')
      localStorage.removeItem('correoREST')
      localStorage.removeItem('foto')
      localStorage.removeItem('ValorAgendado')



    }



    /*---------------------Pedir Domicilio----------------*/
    agendarDomicilio( idRestauranteTS:any, nombresResturanteTS:string, fotoRestauranteTS:any, emailRestauranteTS:any, mesTS:any, nombreTS:any, correoTS:any, pedidoTS:any, DatosClienteTS:any ){


      const formAgendamientoDomicilio = {

        idRestaurante: idRestauranteTS,
        emailRestaurante: emailRestauranteTS, 
        correoCliente: correoTS,
        fecha: mesTS,
        imagen: fotoRestauranteTS,
        nombreCliente: nombreTS,
        nombreRestaurante:nombresResturanteTS,
        pedido: pedidoTS,
        ciudad:DatosClienteTS.ciudad,
        barrio:DatosClienteTS.barrio,
        direccionCliente:DatosClienteTS.direccion,

      }

      return this.usarHttp.post('https://restaurante-15f7b-default-rtdb.firebaseio.com/Domicilios.json', formAgendamientoDomicilio )
                  

    }





    /*-------------------------Trear agendados al perfil del cliente--------------*/
    traerDomiciliosAgendados( correo:any ){

      return this.usarHttp.get('https://restaurante-15f7b-default-rtdb.firebaseio.com/Domicilios.json')
              .pipe(
                map( (resp:any) => {

                    let NuevoArreglo:any = []
                    
                    /*---retornar llaves--*/
                    Object.keys( resp ).forEach( llaves => {

                      let todosLosResgitrosSinLLaves = resp[llaves]
                      todosLosResgitrosSinLLaves.idDomicilio = llaves;

                    })
                  

                    Object.values( resp ).forEach( (valores:any) => {

                      let todosLosCorreos = valores.correoCliente;
                 
                      
                      /*---me retorna perfil cliente----*/
                      if( todosLosCorreos.indexOf( correo ) >= 0 ){

                        NuevoArreglo.push( valores );

                      }
                      

                    })
                  
                    return NuevoArreglo;
                
                  })
              )

    }



    /*------traer pedidos a perfil resturante-------------*/
    traerPedidosDeRestaurante( correoRestaurante:any ){

      return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/Domicilios.json`)
                  .pipe(
                    map( (resp:any) => {
                      
                    
                      const arregloRecibidos:any[] = []
                      
                      Object.keys( resp ).forEach( keys => {
              
                        
                        let TODOSdatos = resp[keys];
                        TODOSdatos.idCliente = keys;
                
                       

                      })

                      Object.values(  resp ).forEach( (sinllaves:any) => {
                        
                        let todos = sinllaves;
                        let correosRestaurantes = sinllaves.emailRestaurante;

                        console.log( correosRestaurantes )

                        if( correosRestaurantes.indexOf( correoRestaurante ) >= 0){

                          arregloRecibidos.push( todos )

                        }
           
                      })


                      return arregloRecibidos

                    })
                  )
          

    }










    /*-----------------------Comentarios-----------------------*/
    comentarioRestaurante(nombreTS:any, correoTS:any, comentarioTS:string, correoRestauranteTS:string){

      let comentario = {

        nombre:nombreTS,
        correo:correoTS,
        comentario:comentarioTS,
        correoRestaurante : correoRestauranteTS,
      }

    return this.usarHttp.post( 'https://restaurante-15f7b-default-rtdb.firebaseio.com/comentarios.json', comentario )
               .pipe(
                map( (resp:any) => {

                  let comentario = {

                    nombre:nombreTS,
                    correo:correoTS,
                    comentario:comentarioTS,
                    correoRestaurante : correoRestauranteTS,
                    id: resp.name
                  
                  }

                  return comentario;
                
                })
              )
    }




    /*-------------------------Traer Comentarios-------------------------*/
    cargarComentarios(){

      return this.usarHttp.get('https://restaurante-15f7b-default-rtdb.firebaseio.com/comentarios.json')
                  .pipe(
                    map( (resp:any) => {

                      let nuevoArreglo:any = []
                      
                      Object.keys( resp ).forEach( llaves => {
                          
                      let todos = resp[llaves];
                      todos.id = llaves;
                      })


                      /*----filtramos por correo---*/
                      Object.values( resp ).forEach( (todosRESP:any) => {

                        let todosLosDatos   = todosRESP;
                        let todosLosCorreos = todosLosDatos.correoRestaurante;
                       
              
                        if( todosLosCorreos.indexOf( 'marino@gmail.com' ) >= 0  ){

                          nuevoArreglo.push( todosLosDatos )

                        }
              
                      })
                      
                      return nuevoArreglo

                    })
                  )

    }





    /*-------------------------------------LOGIN RESTAURANTES---------------------------------*/
    loginRestaurante( correo:string, passTS:any ){

      return this.usarHttp.get( 'https://restaurante-15f7b-default-rtdb.firebaseio.com/registroRestaurante.json' )
                .pipe(
                  map( (data:any) => {

                    let NuevoArregloRestaurante:any = []
                    
                    Object.keys( data ).forEach( llaves => {

                      let todasLasLLaves = data[llaves];
                      todasLasLLaves.idRestaurante = llaves;

                    })



                    Object.values( data ).forEach( (dataRESP:any) => {

                      let todosLosDatos   = dataRESP;
                      let todosLosCorreos = dataRESP.email;
                      
                      if( todosLosCorreos.indexOf( correo ) >=0 ){
                        
                        NuevoArregloRestaurante.push( todosLosDatos )
                        console.log( todosLosDatos )
                     
                      
                      }else{

                   
                      
                      }

                   
                    })


                    if( NuevoArregloRestaurante.length > 0 ){

                      if( passTS ==  NuevoArregloRestaurante[0].pass ){

                        /*--guardar en local storage el correo--*/
                        localStorage.setItem('correoREST', NuevoArregloRestaurante[0].email );
                        return NuevoArregloRestaurante;
                      
                      }else{

                        alert("NO es igual la contraseña")
                      }
                    
                    }else{

                      alert("El correo no existe");
                    
                    }

                  })
                
                )

    }


    leerCorreoAlCargar(){

      if( localStorage.getItem('correoREST') ){

        this.guardarCorreo = localStorage.getItem('correoREST')
      
      }else{

        this.guardarCorreo = ""
      
      }

    }

    validarIngresoResturante(){

      return this.guardarCorreo.length > 1;

    }


        /*-------------------------------------FIN LOGIN RESTAURANTES---------------------------------*/



        /*-------------------------------------ACTUALIZAR DATOS----------------------------------*/

        actualizarDatos( DatosForm:any ){

          let datosActualizar = {

            nombre:             DatosForm.nombre,
            email:              DatosForm.email,
            pass:               DatosForm.pass,
            celular:            DatosForm.celular,
            departamento:       DatosForm.departamento,
            ciudad:             DatosForm.ciudad,
            barrio:             DatosForm.barrio,
            direccion:          DatosForm.direccion,

          }

          let idPersona = localStorage.getItem('idPersona');

          return this.usarHttp.put(`https://restaurante-15f7b-default-rtdb.firebaseio.com/registroCliente/${ idPersona }.json`, datosActualizar)
        
        }








        /*---------------------------TRAER UN USUARIO---------------------------*/
        traerUnUsuario( idPersona:any ){

          return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/registroCliente/${ idPersona }.json`)


        }







      /*-------------------traer Un Restaurante para favoritos--------------------*/
      registrarFavorito( dataRESP:any ){

        
        const registrarFavorito = {

          foto:    dataRESP.foto[0],
          nombre:  dataRESP.nombreRestaurante,
          ciudad:  dataRESP.ciudad,
          visitarRestaurante: dataRESP.id,
          descripcion: dataRESP.descripcion


     
        }

        console.log(dataRESP)
  
        return this.usarHttp.post(`https://restaurante-15f7b-default-rtdb.firebaseio.com/favoritos.json`, registrarFavorito )
                .pipe(
                  map( (resp:any) => {
                    

                    const registrarFavorito = {

                      foto:    dataRESP.foto[0],
                      nombre:  dataRESP.nombreRestaurante,
                      ciudad:  dataRESP.ciudad,
                      id: resp.name
                    
                    }


                    return registrarFavorito

                  })
                )

      }



      /*-----------------------------------------------Cargar restaurantes favoritos------------------------------------*/
      cargarRestaurantesFavoritos(){

        return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/favoritos.json`)
                .pipe(
                  map( (resp:any) => {

                    let nuevoArr:any = []

                    Object.keys( resp ).forEach( llaves => {
                      

                      let todosLosDatos = resp[llaves];
                      todosLosDatos.id = llaves;
                      nuevoArr.push(todosLosDatos)
                    
                    })

                    return nuevoArr;

                  })
                )
      }
    


      /*-------------------------------borrar favorito--------------------------------------*/
      borrarFavoritos( id:any ){

        return this.usarHttp.delete(`https://restaurante-15f7b-default-rtdb.firebaseio.com/favoritos/${ id }.json`)
                            
      }


      /*------------------------------borrar pedido-----------------------------*/
      borrarPedido( id:any ){

        return this.usarHttp.delete(`https://restaurante-15f7b-default-rtdb.firebaseio.com/Domicilios/${ id }.json`)
      }

     



      /*----------------------------Notificaciones---------------------*/
      ResgitrarNotificacion( notificar:any ){
        
        let nota = {

          correoCliente : notificar.correoCliente,
          notificacion  : notificar.notificacion,
          estado : notificar.estado


        }

        return this.usarHttp.post(`https://restaurante-15f7b-default-rtdb.firebaseio.com/notificaciones.json`, nota);

      }





      /*--------------------cargar Notificaciones--------------------*/
      cargarNotificaciones( correo:any ){
      
          return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/notificaciones.json`)
                      .pipe(
                        map( (resp:any) => {
                          
                          let nuevoArr:any = [];
                          
                          /*--llaves--*/
                          Object.keys( resp ).forEach( keys => {
                              
                            let llaves = resp[keys]
                            llaves.idNotificacion = keys

                          })  

                          Object.values( resp ).forEach( (resp:any) => {
                              
                            let todosLosDatodFueraDeLasLLaves = resp;
                            let todosLosCorreos = resp.correoCliente
                            console.log(todosLosCorreos)
                            
                            if( todosLosCorreos.indexOf( correo ) >= 0 ){

                              nuevoArr.push(todosLosDatodFueraDeLasLLaves);
                           

                            }

                          })
                          
                          return nuevoArr
                        
                        })
                      )

      }


      /*----------------------------borrar Notificaciones-----------------------*/
      borrarNotificaciones( id:any ){
          
        return this.usarHttp.delete(`https://restaurante-15f7b-default-rtdb.firebaseio.com/notificaciones/${ id }.json`)

      }


      



      /*------------------------------------guardar mensajes--------------------------*/
      guardarMensajes( formMensaje:any ){

          let mensajes = {

            emailCliente : formMensaje.emailCliente,
            emailResturante: formMensaje.emailResturante,
            mensaje : formMensaje.mensaje,
            nombreRestaurante: formMensaje.nombreRestaurante
          }

         console.log( mensajes );

            
         
        return this.usarHttp.post( `https://restaurante-15f7b-default-rtdb.firebaseio.com/mensajes.json`, mensajes );
          

      }




      /*---------------------------cargar mensajes---------------------------------*/
      cargarMensajes( correo:any ){

        return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/mensajes.json`)
                            .pipe(
                              map( (resp:any) => {

                                let arregloNuevo:any[] = [];
                                

                                /*---llaves---*/
                                Object.keys( resp ).forEach( (llaves:any) => {
                                  
                                  const objetos = resp[llaves]
                                  objetos.id = llaves;
                                  

                                })

                                Object.values( resp ).forEach( (resp:any) => {
                                  //console.log(resp)
                             
                                  let todos = resp
                                  let todosCorreos = resp.emailCliente 


                                  if( todosCorreos.indexOf( correo ) >= 0 ){
                                            
                                      arregloNuevo.push( todos );
                                  
                                    }
                                
                                })

                                return arregloNuevo

                              })
                            )

      }







      /*----------------------------------Borrar Mensajes----------------------------*/
      borrarMensajes( id:any ){

        return this.usarHttp.delete(`https://restaurante-15f7b-default-rtdb.firebaseio.com/mensajes/${ id }.json`)

      }




      /*------------------------------------guardar Mensajes Resturante------------------*/
      mensajesParaRestaurante( datosRespuesta:any ){
        
        const mensajeRestaurante = {

          emailResturante :    datosRespuesta.emailResturante,
          emailCliente :       datosRespuesta.emailCliente,
          mensaje :            datosRespuesta.mensaje,
          nombreRestaurante :  datosRespuesta.nombreRestaurante
       

        }

        console.log(mensajeRestaurante)

        return this.usarHttp.post('https://restaurante-15f7b-default-rtdb.firebaseio.com/mensajesResturante.json', mensajeRestaurante) 

      }





      /*-----------------------------cargar mensajes restaurante----------------------*/
      cargarMensajesRestaurante(){

        return this.usarHttp.get(`https://restaurante-15f7b-default-rtdb.firebaseio.com/mensajesResturante.json`)
                            .pipe(
                              map( (resp:any) => {
                                  
                             
                                let nuevoArr:any[] = [];

                                Object.keys( resp ).forEach( llaves => { 
                                  let datos = resp[llaves];
                                  datos.id = llaves;
                                })


                                Object.values( resp ).forEach( (resp2:any) => {
                                  let objetos = resp2
                                  let todosCorreosRestaurante = objetos.emailResturante

                                
                                  if( todosCorreosRestaurante.indexOf( 'marino@gmail.com' ) >= 0 ){
                                    nuevoArr.push(objetos)
                        
                                  }
      
                                })

                                return nuevoArr

                              })
                            )

      }



      /*-----------------------Borrar comentario del perfil--------------------------*/
      borrarComentarioPerfil( id:any ){

        return this.usarHttp.delete(`https://restaurante-15f7b-default-rtdb.firebaseio.com/comentarios/${ id }.json`);

      }

      

}
