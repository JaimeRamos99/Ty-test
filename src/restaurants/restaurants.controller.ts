import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurants')
@UseGuards(AuthGuard())
export class RestaurantsController {
    @Get()
    prueba(){

    }
}
