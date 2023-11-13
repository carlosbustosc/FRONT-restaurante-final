import { Component, OnInit } from '@angular/core';



/*-------conectar servicios------------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-interna-restaurante',
  templateUrl: './interna-restaurante.component.html',
  styleUrls: ['./interna-restaurante.component.css']
})
export class InternaRestauranteComponent implements OnInit{
    
  dataPedidos:any = []
  posicion:any

  informacionDetalle:any = {}

  mostrarPantallaDetalle = false;
  mostrarPantallaInformacion = true;

  constructor(private conectarServicio:RestauranteService ){

  } 
  
  ngOnInit(): void {
    
    /*---traer correo localStorage---*/
     let emailRestaurante = localStorage.getItem('email');

     
     this.conectarServicio.traerPedidosDeRestaurante()
         .subscribe( resp => {
          
          this.dataPedidos = resp;
          console.log(resp);

        })

      

  }


  verMensaje( valor:number, valor2:number){
  
      console.log(valor)

      this.posicion = document.getElementById(`${valor}`)
      this.posicion.style.display = "none"
      

      this.informacionDetalle =  this.dataPedidos[valor2];
      console.log(this.informacionDetalle );


      this.mostrarPantallaDetalle = true;
      this.mostrarPantallaInformacion = false;


  }

}
