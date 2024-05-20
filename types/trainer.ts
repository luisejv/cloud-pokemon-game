import { TrainerPokemon } from "./trainer-pokemons";

export type Trainer = {
  id: number;
  nombre: string;
  dinero: number;
};

export type LoginRequest = {
  username: string;
};

export type LoginResponse = {
  trainer: Trainer;
};

export type LoginResponseTemp = {
  trainer: any[];
};

export type GetTrainerRequest = {
  id_entrenador: number;
};

export type GetTrainerResponse = {
  trainer: Trainer;
};

export type GetTrainerPokemonsRequest = {
  id_entrenador: number;
};

export type GetTrainerPokemonsResponse = {
  pokemons: TrainerPokemon[];
};

export type PutTrainerRequest = {
  id_entrenador: number;
  nombre: string;
  dinero: number;
};
