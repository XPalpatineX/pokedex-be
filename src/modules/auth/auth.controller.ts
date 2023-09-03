import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body(new ValidationPipe()) signInDto: UserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp(@Body(new ValidationPipe()) signUpDto: UserDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body(new ValidationPipe()) refreshData: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshData);
  }
}
