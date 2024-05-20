export type Pokemon = {
  id: number;
  nombre: string;
  tipo: string;
  catchrate: number;
  sprite: string;
};

export type GetPokemonResponse = {
  pokemons: Pokemon[];
};
