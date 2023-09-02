export type SinglePokemonParam = string | number;

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonSpecie {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  order: 1;
  species: PokemonSpecie;
  stats: PokemonStat[];
  weight: number;
  types: PokemonType[];
}

export enum EPokemonType {
  normal = 1,
  fighting = 2,
  flying = 3,
  poison = 4,
  ground = 5,
  rock = 6,
  bug = 7,
  ghost = 8,
  steel = 9,
  fire = 10,
  water = 11,
  grass = 12,
  electric = 13,
  psychic = 14,
  ice = 15,
  dragon = 16,
  dark = 17,
  fairy = 18,
  unknown = 10001,
  shadow = 10002,
}
export interface PokemonShort extends PokemonSpecie {}

export interface PokemonByType {
  id: number;
  name: string;
  pokemon: {
    pokemon: PokemonShort;
    slot: number;
  }[];
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
}
