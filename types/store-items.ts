export type StoreItem = {
  id: number;
  id_objeto: number;
  id_tienda: number;
  nombre_objeto: string;
  nombre_tienda: string;
  precio: number;
  stock: number;
};

export type GetStoreItemsRequest = {
  id_tienda: number;
};

export type PutStoreItemsRequest = {
  id_objeto: number;
  id_tienda: number;
  nombre_objeto: string;
  nombre_tienda: string;
  precio: number;
  stock: number;
};

export type GetStoreItemsResponse = {
  objetos: StoreItem[];
};
