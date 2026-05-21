import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PessoasService } from '@/pessoas/pessoas.service';
import { TokenPayloadDto } from '../dto/token-payload.dto';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    // Precisamos do PessoasService para buscar active e tokenVersion no banco
    private readonly pessoasService: PessoasService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não logado.');
    }

    let payload: JwtPayload;

    // Passo 1: verifica assinatura, expiração, audience e issuer do token
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    // Passo 2: busca o usuário no banco para checar estado atual
    // Necessário porque o token pode ser válido mas o usuário pode ter sido
    // bloqueado ou ter seus tokens invalidados após a emissão
    const pessoa = await this.pessoasService.findOne(payload.sub);

    // Passo 3: rejeita usuários bloqueados
    if (!pessoa.active) {
      throw new UnauthorizedException('Usuário bloqueado.');
    }

    // Passo 4: rejeita tokens com versão desatualizada
    // Se tokenVersion do payload != tokenVersion do banco,
    // significa que os tokens foram invalidados depois que esse foi emitido
    if (payload.tokenVersion !== pessoa.tokenVersion) {
      throw new UnauthorizedException('Sessão expirada. Faça login novamente.');
    }

    // Passo 5: salva o payload tipado na requisição
    // Os controllers acessam via req['payload'] já como TokenPayloadDto
    request['payload'] = new TokenPayloadDto(payload);

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;
    if (!authorization || typeof authorization !== 'string') return;
    // O header vem como "Bearer <token>" — pegamos só o token
    return authorization.split(' ')[1];
  }
}
