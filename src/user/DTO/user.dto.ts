import { IsEmail, IsString, Length, Matches } from "class-validator";

export class UserDto{
    @IsEmail()
    @IsString()
    email:string;

    @IsString()
    @Length(8, 20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Senha muito fraca!'})
    senha:string;
}