import { GetPokemonResponse } from "@/types/pokemon";
import { API_Pokemons } from "./api-pokemons";

const GET_POKEMON_ENDPOINT = "/pokemons";

export const getPokemons = (): Promise<GetPokemonResponse> =>
  API_Pokemons.get<GetPokemonResponse>(GET_POKEMON_ENDPOINT).then(
    (response) => response.data
  );
