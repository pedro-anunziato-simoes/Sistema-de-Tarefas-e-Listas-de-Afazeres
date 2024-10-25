
import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './DTO/user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>
    ) { }

    findAll() {
        return this.UserRepository.find();
    }

    create(@Body() userDto: UserDto) {
        const category = this.UserRepository.create(userDto);
        return this.UserRepository.save(category);
    }

    async findById(@Param("id") id: string) {
        const user = await this.UserRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException(`Usuario com id '${id}' não encontrado`);
        }
        return user;
    }

    async findByEmail(@Param("email") email: string) {
        const user = await this.UserRepository.findOneBy({ email });
        if (user === null) {
            throw new NotFoundException(`Usuario com e-mail '${email}' não encontrado`);
        }
        return user;
    }

    async update(@Param("id") id: string, @Body() UserDto: UserDto) {
        const user = await this.UserRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException(`Usuario com id '${id}' não encontrado`);
        }

        user.email = UserDto.email;
        user.senha = UserDto.senha;

        return this.UserRepository.save(user);
    }
    async delete(@Param("id") id: number) {
        await this.UserRepository.delete(id);
    }
}
