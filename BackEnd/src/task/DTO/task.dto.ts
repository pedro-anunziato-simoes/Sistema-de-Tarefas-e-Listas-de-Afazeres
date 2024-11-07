import { IsEmail, IsString, Length, Matches } from "class-validator";

export class TaskDto {
    @IsString()
    titulo: string;
    @IsString()
    descricao: string;
    @IsString()
    prioridade:string;
    @IsString()
    cor:string;


}