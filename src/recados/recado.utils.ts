import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  inverteString(str: string) {
    return str.split('').reverse().join('');
  }
}

//Quando você está testando alguma coisa, criamos uma classe de teste
// Dentro do recados.module, colocar new RecadosUtilsMock() detnro do useValue
@Injectable()
export class RecadosUtilsMock {
  inverteString() {
    return 'teste, teste teste';
  }
}
