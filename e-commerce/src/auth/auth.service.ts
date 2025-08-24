/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { AuthenticateDto } from './dto/authenticate.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,

    ) { }

    async register(authDto: AuthenticateDto): Promise<{ token: string; role: string; user: Partial<User> }> {
        const { userName, email, password, address, phone, role } = authDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            role: role || 'user',
        });

        const savedUser = await this.userRepository.save(user);

        const payload = { sub: savedUser.id, email: savedUser.email, role: savedUser.role };
        const token = await this.jwtService.signAsync(payload);

        const { password: _, ...userWithoutPassword } = savedUser;

        return {
            token,
            role: savedUser.role,
            user: userWithoutPassword
        };
    }

    async login(loginDto: LoginDto): Promise<{ token: string; role: string; user: Partial<User> }> {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) throw new UnauthorizedException('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        const { password: _, ...userWithoutPassword } = user;

        return {
            token,
            role: user.role,
            user: userWithoutPassword
        };
    }

    async findProfile(id: number): Promise<Partial<User>> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}