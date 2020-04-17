import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredsDto: AuthCredsDto): Promise<void> {
        return this.userRepository.signUp(authCredsDto);
    }

    async signIn(authCredsDto: AuthCredsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredsDto);
        
        if (!username) {
            throw new UnauthorizedException('Invalid creadentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`)

        return { accessToken };
    }
}
