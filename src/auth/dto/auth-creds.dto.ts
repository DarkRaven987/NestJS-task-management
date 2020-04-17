import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { Task } from "src/tasks/task.entity";

export class AuthCredsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak'})
    password: string;

    salt: string;

    createdAt: Date;
}

