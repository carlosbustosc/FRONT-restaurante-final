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
  
  personaLogueada:boolean = false;

  DepartamentoPorDefecto:any;
  CiudadPorDefecto:any;
  
  valueSelect:any;


  categoriaSeleccionada:any

  nombrePersonaLogueada:any

    constructor(private usarRuta: Router, private cargarJs:CargaJSService){

      /*---cargar archivo js---*/
      this.cargarJs.carga(['funcion']);
      /*---cargar archivo js---*/

    }


  ngOnInit(): void {

    if( localStorage.getItem('nombre') ){

      this.nombrePersonaLogueada = localStorage.getItem('nombre');
      this.personaLogueada = true;
    }else{
      this.personaLogueada = false;
    }
  
  }
  

  categoriaInicio( categoria:any ){
    
    this.categoriaSeleccionada = categoria;
    console.log( this.categoriaSeleccionada );

  }
  

  /*
  valorSelect( parametro:any ){

    this.valueSelect = parametro;

  }
  */
  
  
  buscarComida(){
    
    console.log('funciona');
    this.usarRuta.navigate([ '/restaurantes', this.categoriaSeleccionada ])
    
     //localStorage.setItem('departamento', '28');
     //localStorage.setItem('ciudad', 'Ibagué'); 
  
  }


  


}









