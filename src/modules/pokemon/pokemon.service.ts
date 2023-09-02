import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { PokemonID, Pokemon } from 'interfaces/pokemon.types';

@Injectable()
export class PokemonService {
  private readonly POKEMON_API = process.env.POKEMON_API;
  private readonly logger = new Logger(PokemonService.name);

  constructor(private readonly httpService: HttpService) {}
  async getPokemon(id: PokemonID) {
    try {
      const { data: pokemonData } = await firstValueFrom(
        this.httpService.get<Pokemon>(`${this.POKEMON_API}/pokemon/${id}`),
      );
      return pokemonData;
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
