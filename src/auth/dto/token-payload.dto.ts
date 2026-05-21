// DTO que representa os dados do usuário autenticado disponíveis na requisição
// O AuthTokenGuard salva uma instância desse DTO em request['payload']
// Os controllers usam esses dados para saber quem está fazendo a ação
export class TokenPayloadDto {
  //ID do usuário logado (vem do campp "sub" do JWT)
  sub!: number;

  //E-mail do usuário logado
  email!: string;

  // Versão do token - usada pelo guard para validar invalidação
  tokenVersion!: number;

  //Timestamp unix de expiração do token
  exp!: number;

  // Recebe um objeto parcial e copia as propriedades para a instância
  // Isso permite criar: new TokenPayloadDto(payload) sem precisar setar compo por campo
  constructor(partial: Partial<TokenPayloadDto>) {
    Object.assign(this, partial);
  }
}
