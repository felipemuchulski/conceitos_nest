import { PessoasService } from '@/pessoas/pessoas.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly pessoasService: PessoasService,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const pessoa = await this.pessoasService.findOneByEmail(loginDto.email);

    // Verifica bloqueio ANTES de validar a senha
    // Assim não revelamos se a senha está certa para usuário bloquado
    if (!pessoa.active) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    const passwordIsValid = await this.hashingService.compare(loginDto.password, pessoa.passwordHash);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou inválidos.');
    }

    // Login válido - gera e retorna o par de tokens
    return this.generateTokens(pessoa.id, pessoa.email, pessoa.tokenVersion);
  }

  async refreshTokens(refreshToken: string) {
    let payload: JwtPayload;

    // Tenta decodificar e verificar a assinatura do refresh token
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
    } catch {
      // token expirado, assinatura inválida, malformado, etc.
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    // Busca o usuário no banco para checar o estado atual
    // O token pode ser válido mas o usuário pode ter sido bloqueado depois
    const pessoa = await this.pessoasService.findOne(payload.sub);

    if (!pessoa.active) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    // Compara o tokenVersion do payload com o do banco
    // Se forem diferentes, significa que os tokens foram invalidados
    // (ex: logout forçado, troca de senha, admin bloqueou a sessão)
    if (payload.tokenVersion !== pessoa.tokenVersion) {
      throw new UnauthorizedException('Sessão expirada. Faça login novamente.');
    }

    // Tudo válido -emite novo par de tokens com tokenVersion atual.
    return this.generateTokens(pessoa.id, pessoa.email, pessoa.tokenVersion);
  }

  // Método privado reutilizado por login() e refreshtokens()
  // Gera access token (curto) e refresh token (longo) em paralelo
  private async generateTokens(sub: number, email: string, tokenVersion: number) {
    // Payload base - mesmo conteúdo nos dois tokens
    // tokenVersion é incluído para que o guard possa validar invalidação
    const basePayload = { sub, email, tokenVersion };

    // Promise.all gera os dois tokens em paralelo (mais eficiente)
    const [accessToken, refreshToken] = await Promise.all([
      //Access token: vida curta, usado em toda requisição autenticada
      this.jwtService.signAsync(basePayload, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      }),

      // refresh token: vida longa, usado apenas para renovar o access token
      this.jwtService.signAsync(basePayload, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtRefreshTtl,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
