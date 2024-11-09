
import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';

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
        const userCrpt = new UserDto;
        userCrpt.senha = bcrypt.hashSync(userDto.senha,8);
        const user = this.UserRepository.create(userDto);
        user.senha = userCrpt.senha;
        return this.UserRepository.save(user);
    }

    async findById(@Param("id") id: string) {
        const user = await this.UserRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException(`Usuario com id '${id}' não encontrado`);
        }
        return user;
    }

    async findUser(@Body() userDto: UserDto) {
        const user = await this.findByEmail(userDto.email);
        console.log(bcrypt.compareSync(userDto.senha,user.senha))
        if(bcrypt.compareSync(userDto.senha,user.senha)){
           return true
        }return false
        
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
