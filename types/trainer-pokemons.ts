export type TrainerPokemon = {
  id: string;
  id_pokemon: string;
  id_entrenador: string;
  nombre_pokemon: string;
  nombre_entrenador: string;
  tipo: string;
  sprite: string;
  nivel: number;
  HP: number;
};

export type PostTrainerPokemonRequest = {
  nombre_pokemon: string;
  nombre_entrenador: string;
  id_entrenador: number;
  id_pokemon: number;
  sprite: string;
  tipo: string;
  hp: number;
  nivel: number;
};
