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


    constructor(private usarRuta: Router){
    }


  ngOnInit(): void {

  
  }
  
  
  
  
  buscarComida(){
    
    console.log('funciona');
    this.usarRuta.navigate([ '/restaurantes' ])

    
     localStorage.setItem('departamento', '28');
     localStorage.setItem('ciudad', 'Ibágue'); 
  
  }


  


}









