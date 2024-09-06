import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from 'modules/auth/auth.module';
import { PokemonModule } from 'modules/pokemon/pokemon.module';
import { SessionModule } from 'modules/session/session.module';
import { UsersModule } from 'modules/users/users.module';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    // MongooseModule.forRoot('mongodb://mongodb:27017/pokedex'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        tlsCAFile: path.join(__dirname, '../global-bundle.pem'),
      }),
      inject: [ConfigService],
    }),
    PokemonModule,
    AuthModule,
    UsersModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
