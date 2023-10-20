
import { inject } from '@angular/core';

import { CanActivateFn } from '@angular/router';


/*----------conectar servicio---------*/
import { RestauranteService } from '../services/restaurante.service';

/*------------usar RUTA----------*/
import { Router } from '@angular/router'



export const restauranteGuard: CanActivateFn = (route, state) => {

  const conectarServicio = inject(RestauranteService);
  const usarRuta = inject(Router)


  if( conectarServicio.validarIngresoResturante() ){

    return true;
  
  }else{

    usarRuta.navigate(['/LoginRestauranteComponent']);
    return false;

  }

};
