import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

import {
  SinglePokemonParam,
  Pokemon,
  EPokemonType,
  PokemonByType,
  PokemonShort,
} from 'interfaces/pokemon.types';

@Injectable()
export class PokemonService {
  private readonly MAX_ENTITIES_PER_FILE = 20;
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

  async fileWithPokemon(file: Express.Multer.File): Promise<Pokemon[]> {
    try {
      const stream = Readable.from(file.buffer);
      const pokemonIds: string[] = [];

      await new Promise((resolve, reject) => {
        stream
          .pipe(
            csv({
              headers: ['id'],
              skipLines: 1,
            }),
          )
          .on('data', (chunk: { id: string }) => {
            if (pokemonIds.length >= this.MAX_ENTITIES_PER_FILE) return;
            pokemonIds.push(chunk.id);
          })
          .on('end', () => resolve(true))
          .on('error', (e) => reject(e));
      });

      const allPokemonData: PromiseSettledResult<Pokemon>[] =
        await Promise.allSettled<Pokemon>(
          pokemonIds.map((id: string) => this.getPokemon(id)),
        );

      return allPokemonData
        .filter(({ status }) => status === 'fulfilled')
        .map((pokemon) => (pokemon as PromiseFulfilledResult<Pokemon>).value);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
