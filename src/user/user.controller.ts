import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './DTO/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Post()
    create(@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @Get("findId/:id")
    findById(@Param("id") id: string) {
        return this.userService.findById(id);
    }

    @Get("findEmail/:email")
    findByEmail(@Param("email") email: string) {
        return this.userService.findByEmail(email);
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() UserDto: UserDto) {
        return this.userService.update(id, UserDto);
    }

    @Delete("delete/:id")
    deleteUser(@Param("id") id: number) {
        return this.userService.delete(id);
    }

}
