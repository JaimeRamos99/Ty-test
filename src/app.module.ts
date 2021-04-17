import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, RestaurantsModule],
})
export class AppModule {}
