import { Component, OnInit } from '@angular/core';



/*-------conectar servicios------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-interna-restaurante',
  templateUrl: './interna-restaurante.component.html',
  styleUrls: ['./interna-restaurante.component.css']
})
export class InternaRestauranteComponent implements OnInit{
  
  constructor(private conectarServicio:RestauranteService ){

  } 
  
  ngOnInit(): void {
    
    /*---traer correo localStorage---*/
     let emailRestaurante = localStorage.getItem('email');

     console.log( emailRestaurante )

     this.conectarServicio.traerDomiciliosAgendados( 'carnesTolima@gmail.com' )
         .subscribe( resp => {

          console.log(resp);

        })

      

  }

}
