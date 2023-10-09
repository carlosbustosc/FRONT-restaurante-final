import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {

  mostrarMenuLogin = false;
  

  constructor(){

  }

  
  mostrarMenu(){
     
    let num = 1;

    if( num == 1 ){
      
      this.mostrarMenuLogin = true;
      num = 0;

    }else{

      num = 1;
      this.mostrarMenuLogin = false;
    }
    
  
  }


}
