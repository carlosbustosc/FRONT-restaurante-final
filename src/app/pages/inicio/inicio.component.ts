import { Component, OnInit } from '@angular/core';

/*----------usar ruta------------*/
import { Router } from '@angular/router'


/*-------conectar servivio JS-------------*/
import { CargaJSService } from 'src/app/services/carga-js.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})



export class InicioComponent implements OnInit {

  DepartamentoPorDefecto:any;
  CiudadPorDefecto:any;


  categoriaSeleccionada:any

  nombrePersonaLogueada:any

    constructor(private usarRuta: Router, private cargarJs:CargaJSService){

      /*---cargar archivo js---*/
      this.cargarJs.carga(['funcion']);
      /*---cargar archivo js---*/

    }


  ngOnInit(): void {

    if( localStorage.getItem('nombre') ){

      this.nombrePersonaLogueada = localStorage.getItem('nombre')
    }
  
  }
  

  categoriaInicio( categoria:any ){
    
    this.categoriaSeleccionada = categoria;
  }
  
  
  
  buscarComida(){
    
    console.log('funciona');
    this.usarRuta.navigate([ '/restaurantes', this.categoriaSeleccionada ])



    
     //localStorage.setItem('departamento', '28');
     //localStorage.setItem('ciudad', 'Ibagué'); 
  
  }


  


}









