import {
  GetStoreItemsRequest,
  GetStoreItemsResponse,
  PutStoreItemsRequest,
} from "@/types/store-items";
import { API_Stores } from "./api-stores";

const STORE_ITEMS_ENDPOINT = "/tiendas";

export const getStoreItems = (
  request: GetStoreItemsRequest
): Promise<GetStoreItemsResponse> =>
  API_Stores.get<GetStoreItemsResponse>(
    `${STORE_ITEMS_ENDPOINT}/${request.id_tienda}/objetos`
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.status;
    });

export const putStoreItem = (request: PutStoreItemsRequest): Promise<any> =>
  API_Stores.put<any>(
    `${STORE_ITEMS_ENDPOINT}/${request.id_tienda}/objetos/${request.id_objeto}`,
    {
      nombre_tienda: request.nombre_tienda,
      stock: request.stock,
      nombre_objeto: request.nombre_objeto,
      precio: request.precio,
      id_tienda: request.id_tienda,
      id_objeto: request.id_objeto,
    }
  )
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.status;
    });
