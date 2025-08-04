import { Injectable } from '@angular/core';


/*----importar HttpClient---*/
import { HttpClient, HttpParams } from "@angular/common/http";

/*---importar map---*/
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class RestauranteService {

  correoStorage:any = "";
  passStorage:string = ""

  guardarToken:any = ""


  
  constructor(private usarHttp:HttpClient ) { 

  /*----validar que este el correo --*/
    this.leerTokenCliente();
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


    return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/registrarCliente', formCliente )
            
  }


  


  /*-----------ingreso de clientes------------*/
  loginClientes( formLoginCliente:any ){

        const infoLoginClientes = {
    
          usuario:  formLoginCliente.controls['usuario'].value,
          password: formLoginCliente.controls['password'].value
    
        }
    
        return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/loginClientes', infoLoginClientes)
              .pipe(
                map( ( respuestaDB:any  ) => {
                    
                this.guardarToken = respuestaDB.Token;
                localStorage.setItem('tokenCliente', this.guardarToken);
                return respuestaDB;

                })
              )
                        
    
    }
    




    /*---Leer que exista el correo e local storage---*/
    leerTokenCliente(){

      if( localStorage.getItem('tokenCliente') ){
        
        this.correoStorage = localStorage.getItem('tokenCliente');
        //alert(this.correoStorage);

      }else{

        this.correoStorage = ""
      
      }

    }


    /*-----validar que el correo sea mayor a 2 en el guard ---true---*/
    validarTokenCliente(){
      
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

      return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/registroResturante', registroRestaurante);
                                 
    }

     /*--------------------------fin Registro de resturantes------------------------*/






    /*-----------------------------Filtrar Restaurantes-------------------------*/
    filtrarRestaurantes( categoriaComida:any,  categoriaDepartamento:any, categoriaCiudad:any){
    

      let params = new HttpParams()
        
      
        .set('Comida', categoriaComida)
        .set('Departamento', categoriaDepartamento)
        .set('ciudad', categoriaCiudad);
     

      return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/traerRestaurantes`, { params })
                                
  
    }


    /*-----------------------------fin Filtrar Restaurantes-------------------------*/










    /*---------------------------traer Un Restaurante---------------------------*/
    traerUnRestaurante( id:any ){
      
      console.log(id)
      return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/unSoloRestaurante/${ id }`);

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

      localStorage.removeItem('tokenCliente');
      localStorage.removeItem('celular');
      localStorage.removeItem('email');

      localStorage.removeItem('pass');
      localStorage.removeItem('pass2');

      localStorage.removeItem('ValorAgendado');

      localStorage.removeItem('idPersona');
    

      /*---resturante---*/
      localStorage.removeItem('nombreRestaurante')
      localStorage.removeItem('token')
      localStorage.removeItem('foto')
      localStorage.removeItem('ValorAgendado')

      localStorage.removeItem('mensajeVisto')
      localStorage.removeItem('notificionVista')

      localStorage.removeItem('notificionVista')
      localStorage.removeItem('emailREST')
      localStorage.removeItem('agendado')







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
      
     console.log(formAgendamientoDomicilio)

      return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/registrarDomicilio', formAgendamientoDomicilio )
                  

    }





    /*-------------------------Trear agendados al perfil del cliente--------------*/
    traerDomiciliosAgendados( correo:any ){
      
      const datoCorreo = {

        correo: correo
      }

      return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/domiciliosPerfil', datoCorreo);
        
    }



    /*------traer pedidos a perfil resturante-------------*/
    traerPedidosDeRestaurante( correoRestaurante:any ){
      

      return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarDomicilios/${ correoRestaurante }`)
                 
          

    }










    /*-----------------------Comentarios-----------------------*/
    comentarioRestaurante(nombreTS:any, correoTS:any, comentarioTS:string, correoRestauranteTS:string){

      let comentario = {

        nombre:nombreTS,
        correo:correoTS,
        comentario:comentarioTS,
        correoRestaurante : correoRestauranteTS,
      }
  
      console.log(comentario)

    return this.usarHttp.post( 'https://back-restaurante-u09u.onrender.com/registrarComentario', comentario )
    
    
    }




    /*-------------------------Traer Comentarios-------------------------*/
    cargarComentarios( email:any ){

      return this.usarHttp.get('https://back-restaurante-u09u.onrender.com/cargarComentario')
                .pipe(
                  map( (resp:any) => {
                    
                
                    const arrayNew:any = []

                    const todosLosComentarios = resp.todosLosComentarios;

                    Object.values( todosLosComentarios ).forEach( ( datos:any ) => {
                      
                       let todoLosCorreos = datos.correoRestaurante 
              
                       if(  todoLosCorreos.indexOf( email ) >= 0 )
                          
                          arrayNew.push(datos) 
                          
                    
                    }) 
                    
                    //console.log(arrayNew)
                    return arrayNew;

                  })
                )
                  

    }





    /*-------------------------------------LOGIN RESTAURANTES---------------------------------*/
    loginRestaurante( correo:string, passLG:any ){
      
      const loginRestaurante = {
        correo: correo,
        pass  : passLG
      }

      return this.usarHttp.post( 'https://back-restaurante-u09u.onrender.com/loginRestaurante', loginRestaurante )
                .pipe(
                  map( ( respuesta:any ) => {
                    
                    this.guardarToken = respuesta.TokenResturante 
                    localStorage.setItem('token', this.guardarToken);
                    return respuesta

                  })
                )
                
    }

  
      

    //-----leer token-------
    leerCorreoAlCargar(){

      if( localStorage.getItem('token') ){
        
        this.guardarToken = localStorage.getItem('token')
      
      }else{

        this.guardarToken = ""
      
      }

    }




    //---validar que exista el token
    validarIngresoResturante(){
     
      return this.guardarToken.length > 1;

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
            
          console.log(datosActualizar)


          return this.usarHttp.put(`https://back-restaurante-u09u.onrender.com/actualizarInformacionPerfil`, datosActualizar)
        
        }








        /*---------------------------TRAER UN USUARIO---------------------------*/
        traerUnUsuario( correoCliente:any ){
          
           const datocorreo = {
            
            correo:correoCliente
           
          } 

          return this.usarHttp.post(`https://back-restaurante-u09u.onrender.com/traerUnCliente`, datocorreo)
            


        }







      /*-------------------traer Un Restaurante para favoritos--------------------*/
      registrarFavorito( dataRESP:any ){

        
        const registrarFavorito = {

          foto:    dataRESP.foto[0],
          nombre:  dataRESP.nombreRestaurante,
          ciudad:  dataRESP.ciudad,
          visitarRestaurante: dataRESP._id,
          descripcion: dataRESP.descripcion,
          email: dataRESP.email,
          emailPersona : localStorage.getItem('email')
       
          
        }

        //console.log(dataRESP)
        console.log(registrarFavorito)
  
        return this.usarHttp.post(`https://back-restaurante-u09u.onrender.com/registroFavorito`, registrarFavorito )
                

      }



      /*-----------------------------------------------Cargar restaurantes favoritos------------------------------------*/
      cargarRestaurantesFavoritos( emailPersona:any ){
    
        console.log(emailPersona)
          
        return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/traerFavorito/${ emailPersona }`)
                
      }
    


      /*-------------------------------borrar favorito--------------------------------------*/
      borrarFavoritos( id:any ){
        
        console.log(id)
        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarFavorito/${ id }`)
                            
      }


      /*------------------------------borrar pedido-----------------------------*/
      borrarPedido( id:any ){
        
        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarDomicilio/${ id }`)
      
      }

     



      /*----------------------------Notificaciones---------------------*/
      ResgitrarNotificacion( notificar:any ){
        
        let nota = {

          nombreCliente: notificar.nombreCliente,
          ciudad: notificar.ciudad,
          barrio: notificar.barrio,
          direccionCliente: notificar.direccionCliente,
          fechaDomicilio: notificar.fechaDomicilio,
          pedido: notificar.pedido,

          correoCliente : notificar.correoCliente,
          notificacion  : notificar.notificacion,
          estado : notificar.estado

        }

        return this.usarHttp.post(`https://back-restaurante-u09u.onrender.com/guardarNotificacion`, nota);

      }

      
      /*----------------obtener GESTIONADOS---------*/
      traerGestionados( ){
          
        //console.log(estado)
        return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/traerGestinados`);
      }




      eliminarGestionado( id:any ){
        
        console.log(id)
        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarGestionado/${ id }`)

      }










      

      /*--------------------cargar Notificaciones--------------------*/
      cargarNotificaciones( correo:any ){
          
          console.log(correo); // pr si quisiera buscar directamente por correo - params

          //return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarNotificaciones`)

          return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarNotificaciones`)
                  .pipe(
                    map( (resp:any) => {
                        
                      const nuevoARR:any = []



                      const arreglo = resp.todasLasNotificaciones;
                      
                      Object.values( arreglo ).forEach( (datosObjetos:any) => {
                      
                        const correoCliente = datosObjetos.correoCliente
                        
                          
                        //comprobamos que el correo exista
                        if( correoCliente.indexOf( correo ) >= 0 ){
                          
                            nuevoARR.push(datosObjetos) 
                        
                        }

                      })
                      
                      return nuevoARR

                    })
                  )

                      

      }


      /*----------------------------borrar Notificaciones-----------------------*/
      borrarNotificaciones( id:any ){
        
      

        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarNotificacion/${ id }`);

      }


      



      /*--------------------------------guardar mensajes----------------------------*/
      guardarMensajes( formMensaje:any ){
        

          let mensajes = {
            emailCliente        : formMensaje.emailCliente,
            emailResturante     : formMensaje.emailResturante,
            mensajeDeResturante : formMensaje.mensajeDeResturante,
            nombreRestaurante    : formMensaje.nombreRestaurante
          }

         console.log( mensajes );

        return this.usarHttp.post( `https://back-restaurante-u09u.onrender.com/guardarMensajes`, mensajes );   

      }







      /*---------------------------cargar mensajes---------------------------------*/
      cargarMensajesCliente( correo:any ){

        //return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarMensajesRestaurantes/${ correo }`)

        return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarMensajesRestaurantes/${ correo }`)

        
      }







      /*----------------------------------Borrar Mensajes----------------------------*/
      borrarMensajes( id:any ){
        
       
        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarMensajes/${ id }`)

      }


      borrarMensajesClientes( id:any ){
        
        console.log(id)
        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarMensajesClientes/${ id }`)

      }






      /*------------------------------------guardar Mensajes Resturante------------------*/
      mensajesParaRestaurante( datosRespuesta:any ){
        
        const mensajeRestaurante = {

          emailResturante :    datosRespuesta.emailResturante,
          emailCliente :       datosRespuesta.emailCliente,
          mensajeDecliente :   datosRespuesta.mensajeDecliente,
          nombreRestaurante :  datosRespuesta.nombreRestaurante,
          nombreCliente :      datosRespuesta.nombreCliente
       

        }

        console.log(mensajeRestaurante)

        return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/guardarClientes', mensajeRestaurante) 
                

      }





      /*-----------------------------cargar mensajes restaurante----------------------*/
      cargarMensajesRestaurante( email:any ){

        return this.usarHttp.get(`https://back-restaurante-u09u.onrender.com/listarClientes`)
         .pipe(
          map( (resp:any) => {
              
              let nuevoArreglo:any = [];
              let todosLosMensajes = resp.mensajesDB
           

              Object.values( todosLosMensajes ).forEach( ( datos:any ) => {

                 let todoLosRestarantes = datos.emailResturante 
                
                if( todoLosRestarantes.indexOf( email ) >= 0 ){
                    
                     nuevoArreglo.push(datos)
                   
                }

                
              })
              

              return nuevoArreglo
          })
         
        )
                                

      }



      /*-----------------------Borrar comentario del perfil--------------------------*/
      borrarComentarioPerfil( id:any ){
        
        console.log(id)

        return this.usarHttp.delete(`https://back-restaurante-u09u.onrender.com/borrarComentario/${ id }`);

      }







      /*----------------------------guardar FOTO PERFIL------------------------*/
      guardarFotoPerfil( foto:any, correo:any ){
        
 
        const datos = {
          
          correoF: correo,
          fotoF: foto
        }

        console.log(datos)

        return this.usarHttp.post(`https://back-restaurante-u09u.onrender.com/guardarFotoPerfil`, datos);
        
      }  

      


      /*--------------------------cargar Imagen de perfil------------------------*/
      cargarImagenPerfil( correoUsuarioFoto:any ){
          
        const usuario = {
          correo: correoUsuarioFoto
        }
       

        return this.usarHttp.post('https://back-restaurante-u09u.onrender.com/listarFotoPerfil', usuario )
                            
      }    

}
