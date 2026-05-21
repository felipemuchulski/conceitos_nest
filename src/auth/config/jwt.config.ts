import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,

    // Tempo de vida do access token em segundos
    // Padrão: 3600 = 1hora
    // Token curto por segurança = se vazar expira rápido
    jwtTtl: Number(process.env.JWT_TTL ?? '3600'),

    // Tempo de vida do refresh token em segundos
    // Padrão: 86400 = 24 horas
    // Token Longo - permite renovar o access token sem novo login
    jwtRefreshTtl: Number(process.env.JWT_REFRESH_TTL ?? '86400'),
  };
});
