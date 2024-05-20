export type TrainerItem = {
  id: number;
  id_objeto: number;
  id_entrenador: number;
  nombre_objeto: string;
  nombre_entrenador: string;
  cantidad: number;
};

export type GetTrainerItemsResponse = {
  objetos: TrainerItem[];
};

export type GetTrainerItemsRequest = {
  id_entrenador: number;
};

export type PostTrainerItemRequest = {
  id_objeto: number;
  id_entrenador: number;
  cantidad: number;
  nombre_objeto: string;
  nombre_entrenador: string;
};
