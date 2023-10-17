import { Component, OnInit } from '@angular/core';

/*----------usar ruta------------*/
import { Router } from '@angular/router'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  DepartamentoPorDefecto:any;
  CiudadPorDefecto:any;
  
  valueSelect:any;


    constructor(private usarRuta: Router){
    }


  ngOnInit(): void {

  
  }
  
  

  valorSelect( parametro:any ){

    this.valueSelect = parametro;

  }
  
  
  buscarComida(){
    
    //console.log(this.valueSelect)
    this.usarRuta.navigate([ '/restaurantes', this.valueSelect ])

    
     //localStorage.setItem('departamento', '28');
     //localStorage.setItem('ciudad', 'Ibagué'); 
  
  }


  


}









