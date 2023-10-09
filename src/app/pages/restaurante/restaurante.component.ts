import { Component, OnInit } from '@angular/core';

/*---recibir parametro---*/
import { ActivatedRoute } from "@angular/router";


/*-----------------conectar servicio-----------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})



export class RestauranteComponent implements OnInit {


  constructor(private recibirParametro:ActivatedRoute, private conectarServicio:RestauranteService  ){
  }
  
  
  
  ngOnInit(): void {

    this.recibirParametro.params
        .subscribe( resp => {

          console.log("recibido: "+ resp['id']);

          /*-----traer un restaurante------*/
          this.conectarServicio.traerUnRestaurante( resp['id'] )
              .subscribe( resp => {
                console.log(resp);
              })

        })
  }




}
