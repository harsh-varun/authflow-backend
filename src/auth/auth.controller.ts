import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    const token = await this.authService.signup(dto);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'signup successful' });
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'Login successful' });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token'); // Clear the cookie
    return { message: 'Logged out' };
  }
}
