import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prodtype'
})
export class ProdtypePipe implements PipeTransform {

  transform(values: any[], ...args: any[]): any {
    //return values.filter((prod) => prod.prod_Type === 'Agro');
    return values.filter((prod) => prod.prod_Type === 'CPVC');
  }


}
