import { Controller, Get, Param } from '@nestjs/common';

import { PokemonService } from './pokemon.service';
import { PokemonID } from 'interfaces/pokemon.types';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  async findPokemon(@Param('id') id: PokemonID) {
    return await this.pokemonService.getPokemon(id);
  }
}
