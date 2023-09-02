import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.pokemonService.fileWithPokemon(file);
  }
}
