export const PAYMENT_MODULE_OPTIONS = Symbol('PAYMENT_MODULE_OPTIONS');
export const PIX_GATEWAY = Symbol('PIX_GATEWAY');
export const STRIPE_GATEWAY = Symbol('STRIPE_GATEWAY');
/*
A constante está sendo utilizada para guardar o Symbol e reutilizá-lo em vários lugares
sem precisar recriar.

O Symbol é um tipo primitivo do JS/TS que gera um valor único e irrepetível. Mesmo
que dois Symbols tenham o mesmo nome, eles nunca são iguais:

Aqui no Nest ele está sendo usado como token de injeção de dependência - garantindo que
não haverá colisão de nomes entre diferentes módulos da aplicação.
*/
