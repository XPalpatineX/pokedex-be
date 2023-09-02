export type PokemonID = string;

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
