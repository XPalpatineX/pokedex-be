import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from 'modules/pokemon/pokemon.module';
import { AuthModule } from 'modules/auth/auth.module';
import { UsersModule } from 'modules/users/users.module';
import { SessionModule } from 'modules/session/session.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/pokedex'),
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: process.env.DATABASE_URL,
    //   }),
    // }),
    ConfigModule.forRoot(),
    PokemonModule,
    AuthModule,
    UsersModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
