/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new UnauthorizedException('No token provided');

        const token = authHeader.split(' ')[1];
        try {
            const decoded: any = await this.jwtService.verifyAsync(token);
            if (decoded.role !== 'admin') throw new UnauthorizedException('Not admin');
            request.user = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
