// Representa o payload decodificado de qualquer token JWT do sistema
// Usado para tipar o resultado do jwtService.verifyAsync()
export interface JwtPayload {
  // ID do usuário - campo padrão do JWT para identificar o "subject"
  sub: number;

  // E-mail do usuário
  email: string;

  // Versão do token no momento em que foi gerado
  // Comparamos com pessoa.tokenVersion no banco
  // Se forem diferentes -> token invalidado -> rejeitamos
  tokenVersion: number;

  // campos padrão do JWT preenchidas automaticamente pela lib
  iss: string; // issuer: quem emitiu o token
  aud: string; // audience: para quem o token foi emitido
  exp: number; // expiration: timestamp Unix de expiração (era "expo" - typo corrigido)
}
