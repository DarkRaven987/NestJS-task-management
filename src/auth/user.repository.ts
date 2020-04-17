import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredsDto } from "./dto/auth-creds.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredsDto: AuthCredsDto): Promise<void> {
        const { username, password } = authCredsDto;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User();
        user.username = username;
        user.password = hashedPassword;
        user.salt = salt;
        user.createdAt = new Date();

        try {
            await user.save();
        } catch (error) {
            if (error.code == 23505) {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredsDto: AuthCredsDto): Promise<string> {
        const { username, password } = authCredsDto;
        const user = await this.findOne({ username });
        
        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
        
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}