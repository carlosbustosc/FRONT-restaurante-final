import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent {


  @Input() ventanaMensajesRespuestaHijo:any;
  @Input() nombreRespuestaHijo:any;
  @Input() nombreCliente1_Hijo:any;
  @Input() nombreResturante1Hijo:any;


  //--crear eventos
  @Output() enviarClick1 = new EventEmitter(); // emite el evento
  @Output() enviarClick2 = new EventEmitter();
  @Output() enviarClick3 = new EventEmitter();
  
// Emitir ngModel
  @Output() enviarClick = new EventEmitter();


  mensaje = "" // este mensaje no guarda nada es para cumplir el ng Model
  @Output() enviarNgModel = new EventEmitter();


  mensajeTXT(valor:any){ // valor: es el texto escrito en el text area
      this.enviarNgModel.emit(valor); // mandamos el evento con el valor
  }



  cerrar_ventana_mensajes_Hijo(){
      
    this.enviarClick1.emit()
    
  }

  
  enviarRespuesta2_Hijo(){

    this.enviarClick2.emit()

  }

  enviarRespuesta_Hijo(){
      
    this.enviarClick3.emit()
  }



 
}
