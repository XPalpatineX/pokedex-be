import { PokemonShort } from 'interfaces/pokemon.types';

export enum EDefaultPagination {
  limit = 20,
  page = 1,
}

export interface ReqPagination {
  limit: number;
  page: number;
}

export class Pagination {
  private limit: number = EDefaultPagination.limit;
  private page: number = EDefaultPagination.page;
  private data: PokemonShort[] = [];

  constructor(result: PokemonShort[], pagination: ReqPagination) {
    if (result.length) this.data = result;
    this.limit = pagination.limit;
    this.page = pagination.page;
  }
}
