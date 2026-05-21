import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsNotEmpty, IsString } from 'class-validator';

//DTO inline para o endpoint de refresh
// Poderia ser um arquivo separadom, mas é simples o suficiente para ficar aqui
class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth
  // recebe email + senha, devolve accessToken + refreshToken
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
