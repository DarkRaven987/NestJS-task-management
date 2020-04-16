import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredsDto: AuthCredsDto) {
        return this.authService.signUp(authCredsDto)       
    }
}
