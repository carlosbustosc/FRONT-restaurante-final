import { Component, OnInit } from '@angular/core';

/*-----conectar servicios------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.component.html',
  styleUrls: ['./perfil-restaurante.component.css']
})
export class PerfilRestauranteComponent implements OnInit {

    constructor( private conectarServicio: RestauranteService ){
  

    }
  
    /*--traer el restaurante por URL o por loca Stotage----*/



    ngOnInit(): void {
      
        this.conectarServicio.traerDomiciliosAgendados('carnesTolima@gmail.com')
            .subscribe( resp => {
              
              console.log(resp);

            })

    }
}
