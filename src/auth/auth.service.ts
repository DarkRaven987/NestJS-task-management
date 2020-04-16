import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCredsDto: AuthCredsDto): Promise<void> {
        return this.userRepository.signUp(authCredsDto);
    }
}
