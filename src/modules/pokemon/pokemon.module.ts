import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PaginationMiddleware } from 'middleware/pagination.middleware';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'pokemon', method: RequestMethod.GET });
  }
}
