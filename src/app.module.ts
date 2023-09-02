import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './modules//pokemon/pokemon.module';

@Module({
  imports: [ConfigModule.forRoot(), PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
