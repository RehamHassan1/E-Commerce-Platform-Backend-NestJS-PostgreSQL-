/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class ProfileDto {
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsString()
    readonly address?: string;  

    @IsOptional()
    @IsString()
    readonly phone?: string;    
}
