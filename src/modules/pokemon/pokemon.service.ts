import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import {
  SinglePokemonParam,
  Pokemon,
  EPokemonType,
  PokemonByType,
  PokemonShort,
  PokemonList,
} from 'interfaces/pokemon.types';

@Injectable()
export class PokemonService {
  private readonly POKEMON_API = process.env.POKEMON_API;
  private readonly logger = new Logger(PokemonService.name);

  constructor(private readonly httpService: HttpService) {}
  async getPokemon(id: SinglePokemonParam): Promise<Pokemon> {
    try {
      const { data: pokemonData } = await firstValueFrom(
        this.httpService.get<Pokemon>(`${this.POKEMON_API}/pokemon/${id}`),
      );
      return pokemonData;
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  async getAllPokemonByType(type: number): Promise<PokemonShort[]> {
    try {
      const typeExist = Object.values(EPokemonType)
        .filter((i: string | number) => !isNaN(Number(i)))
        .includes(type);

      if (!typeExist) {
        throw new BadRequestException('Invalid typeId');
      }

      const { data: pokemonData } = await firstValueFrom(
        this.httpService.get<PokemonByType>(`${this.POKEMON_API}/type/${type}`),
      );
      const mappedData: PokemonShort[] = pokemonData.pokemon.map(
        ({ pokemon }) => pokemon,
      );

      return mappedData;
    } catch (e) {
      this.logger.error(e.message);

      if (e instanceof BadRequestException) {
        throw e;
      }
    }
  }
}
