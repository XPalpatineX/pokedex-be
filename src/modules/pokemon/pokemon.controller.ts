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
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';

import { PokemonService } from './pokemon.service';
import { SinglePokemonParam } from 'interfaces/pokemon.types';
import { RateLimitFilter } from 'exceptions/throttler.filter';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { Pagination } from 'decorators/pagination.decorator';
import {
  ReqPagination,
  Pagination as PaginationStructure,
} from 'interfaces/pagination';

@UseGuards(ThrottlerGuard)
@UseFilters(RateLimitFilter)
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('')
  async getAllPokemon(@Pagination() pagination: ReqPagination) {
    const result = await this.pokemonService.getAllPokemon(pagination);
    return new PaginationStructure(result, pagination);
  }

  @Get(':id')
  async findPokemon(@Param('id') id: SinglePokemonParam) {
    return await this.pokemonService.getPokemon(id);
  }

  @Get('type/:typeId')
  async findAllPokemonByType(@Param('typeId', ParseIntPipe) typeId: number) {
    return await this.pokemonService.getAllPokemonByType(typeId);
  }

  @Post('file')
  @UseGuards(JwtAuthGuard)
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
