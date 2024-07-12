import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

/*-----importamos el servicio------*/
import { RestauranteService } from '../services/restaurante.service';


/*-----usar ruta*---*/
import { Router } from '@angular/router';


export const clienteGuard: CanActivateFn = (route, state) => {

  const conectarServicio = inject(RestauranteService);
  const usarRuta = inject(Router);
  

  if( conectarServicio.validarTokenCliente() ){
    return true;

  }else{
    
    usarRuta.navigate(['/loginCliente']);
    return false;
  
  }

};
