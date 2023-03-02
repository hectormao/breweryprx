import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreweryController } from './brewery/brewery.controller';
import { BreweryService } from './brewery/brewery.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, BreweryController],
  providers: [AppService, BreweryService],
})
export class AppModule {}
