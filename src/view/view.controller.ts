import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/constants';

@Controller()
export class ViewController {

    @Get()
    @Render('index')
    home() {
        return {};
    }

    @Public()
    @Get('login')
    @Render('login')
    login() {
        return {};
    }
}
