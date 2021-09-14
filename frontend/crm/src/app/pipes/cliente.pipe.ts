import { Pipe, PipeTransform } from '@angular/core';
import { Clientes } from '../models/clientes';

@Pipe({
  name: 'cliente'
})
export class ClientePipe implements PipeTransform {

  transform(arreglo: Clientes[], texto: any): any {

    if(texto) {
      return arreglo.filter(
        item => JSON.stringify(item).toLocaleLowerCase().includes(texto)
      );
    }
    else{
      return arreglo;
    }

  }

}
