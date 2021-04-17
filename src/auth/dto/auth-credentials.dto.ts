import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;


    @IsString()
    @MinLength(9)
    @MaxLength(30)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'The password is too weak'},
    )
    password: string;
}