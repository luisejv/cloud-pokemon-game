import { PostTrainerPokemonRequest } from "@/types/trainer-pokemons";
import { API_Trainers } from "./api-trainers";
import {
  GetTrainerItemsResponse,
  GetTrainerItemsRequest,
  PostTrainerItemRequest,
} from "@/types/trainer-items";
import {
  GetTrainerPokemonsRequest,
  GetTrainerPokemonsResponse,
  GetTrainerRequest,
  GetTrainerResponse,
  LoginRequest,
  LoginResponse,
  LoginResponseTemp,
  PutTrainerRequest,
} from "@/types/trainer";

const GET_TRAINER_ENDPOINT = "/trainers";
const PUT_TRAINER_ENDPOINT = "/trainers";
const GET_TRAINER_ITEMS_ENDPOINT = "/objetos_de_entrenadoc";
const POST_TRAINER_ITEMS_ENDPOINT = "/crear_objeto_de_entrenador";
const POST_TRAINER_POKEMONS_ENDPOINT = "/crear_pokemon_de_entrenador";
const PUT_TRAINER_ITEMS_ENDPOINT = "/modificar_objeto_de_entrenador";
const GET_TRAINER_POKEMONS_ENDPOINT = "/pokemons_de_entrenador";
const LOGIN_ENDPOINT = "/login";

export const loginTrainer = (request: LoginRequest): Promise<LoginResponse> =>
  API_Trainers.post<LoginResponseTemp>(
    LOGIN_ENDPOINT,
    {},
    {
      params: {
        username: request.username,
      },
    }
  )
    .then((response) => ({
      trainer: {
        id: response.data.trainer[0],
        nombre: response.data.trainer[1],
        dinero: response.data.trainer[2],
      },
    }))
    .catch((e) => {
      throw e.response.status;
    });

export const getTrainerItems = (
  request: GetTrainerItemsRequest
): Promise<GetTrainerItemsResponse> =>
  API_Trainers.get<GetTrainerItemsResponse>(
    `${GET_TRAINER_ITEMS_ENDPOINT}/${request.id_entrenador}`
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.status;
    });

export const addTrainerItem = (request: PostTrainerItemRequest): Promise<any> =>
  API_Trainers.post<any>(
    POST_TRAINER_ITEMS_ENDPOINT,
    {},
    {
      params: {
        id_entrenador: request.id_entrenador,
        id_objeto: request.id_objeto,
        cantidad: request.cantidad,
        nombre_objeto: request.nombre_objeto,
        nombre_entrenador: request.nombre_entrenador,
      },
    }
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.status;
    });

export const catchPokemon = (
  request: PostTrainerPokemonRequest
): Promise<any> =>
  API_Trainers.post<any>(
    POST_TRAINER_POKEMONS_ENDPOINT,
    {},
    {
      params: {
        nombre_entrenador: request.nombre_entrenador,
        nombre_pokemon: request.nombre_pokemon,
        id_pokemon: request.id_pokemon,
        id_entrenador: request.id_entrenador,
        sprite: request.sprite,
        nivel: request.nivel,
        HP: request.hp,
        tipo: request.tipo,
      },
    }
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.respone.status;
    });

export const modifyTrainerItems = (
  request: PostTrainerItemRequest
): Promise<any> =>
  API_Trainers.put<any>(
    PUT_TRAINER_ITEMS_ENDPOINT,
    {},
    {
      params: {
        id_entrenador: request.id_entrenador,
        id_objeto: request.id_objeto,
        cantidad: request.cantidad,
      },
    }
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.respone.status;
    });

export const getTrainerInfo = (
  request: GetTrainerRequest
): Promise<GetTrainerResponse> =>
  API_Trainers.get<GetTrainerResponse>(
    `${GET_TRAINER_ENDPOINT}/${request.id_entrenador}`
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.respone.status;
    });

export const getTrainerPokemons = (
  request: GetTrainerPokemonsRequest
): Promise<GetTrainerPokemonsResponse> =>
  API_Trainers.get<GetTrainerPokemonsResponse>(
    `${GET_TRAINER_POKEMONS_ENDPOINT}/${request.id_entrenador}`
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.respone.status;
    });

export const putTrainerInfo = (request: PutTrainerRequest): Promise<any> =>
  API_Trainers.put<any>(`${PUT_TRAINER_ENDPOINT}/${request.id_entrenador}`, {
    id: request.id_entrenador,
    nombre: request.nombre,
    dinero: request.dinero,
  })
    .then((response) => response.data)
    .catch((e) => {
      throw e.respone.status;
    });
