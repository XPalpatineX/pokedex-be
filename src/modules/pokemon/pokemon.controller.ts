import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { PokemonService } from './pokemon.service';
import { SinglePokemonParam } from 'interfaces/pokemon.types';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  async findPokemon(@Param('id') id: SinglePokemonParam) {
    return await this.pokemonService.getPokemon(id);
  }

  @Get('type/:typeId')
  async findAllPokemon(@Param('typeId', ParseIntPipe) typeId: number) {
    return await this.pokemonService.getAllPokemonByType(typeId);
  }
}
