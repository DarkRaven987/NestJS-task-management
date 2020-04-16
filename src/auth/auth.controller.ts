import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredsDto: AuthCredsDto): Promise<void> {
        return this.authService.signUp(authCredsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredsDto: AuthCredsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
