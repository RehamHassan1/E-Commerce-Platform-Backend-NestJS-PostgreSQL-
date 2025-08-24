/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post, Body, Get, Param, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() authDto: AuthenticateDto) {
        return this.authService.register(authDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        (req as Request & { session?: any }).session?.destroy(() => {
            res.clearCookie('connect.sid');
        });

        return res.json({ message: 'Logged out successfully' });
    }

    @Get('profile/:id')
    profile(@Param('id') id: number) {
        return this.authService.findProfile(id);
    }
}