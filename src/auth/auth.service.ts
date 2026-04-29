import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { HashingService } from './hashing/hashing.service';
import { PessoasService } from '@/pessoas/pessoas.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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

    const passwordIsValid = await this.hashingService.compare(loginDto.password, pessoa.passwordHash);

    if (!passwordIsValid) throw new UnauthorizedException('Usuário ou senha inválidos. ');

    const accessToken = await this.jwtService.signAsync(
      {
        sub: pessoa.id,
        email: pessoa.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
