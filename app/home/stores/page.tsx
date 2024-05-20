"use client";
import MessageModal from "@/components/MessageModal";
import StoreTable from "@/components/StoreTable";
import { getUserFromLocalStorage } from "@/lib/localStorage";
import { getStoreItems, putStoreItem } from "@/services/stores";
import {
  addTrainerItem,
  getTrainerInfo,
  getTrainerItems,
  modifyTrainerItems,
  putTrainerInfo,
} from "@/services/trainers";
import { PutStoreItemsRequest, StoreItem } from "@/types/store-items";
import { Trainer } from "@/types/trainer";
import { PostTrainerItemRequest, TrainerItem } from "@/types/trainer-items";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Stores() {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [trainerItems, setTrainerItems] = useState<TrainerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [trainer, setTrainer] = useState<Trainer>();
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const buy = async (id_objeto: number) => {
    try {
      if (trainer) {
        const itemToModifyInTrainerItems = trainerItems.find(
          (item) => item.id_objeto === id_objeto
        );
        const itemToModifyInStoreItems = storeItems.find(
          (item) => item.id_objeto === id_objeto
        );
        if (
          itemToModifyInStoreItems &&
          trainer.dinero >= itemToModifyInStoreItems.precio
        ) {
          const modifyStoreItemsRequest: PutStoreItemsRequest = {
            ...itemToModifyInStoreItems,
            stock: itemToModifyInStoreItems?.stock! - 1,
          };
          if (itemToModifyInTrainerItems) {
            const modifyTrainerItemsRequest: PostTrainerItemRequest = {
              ...itemToModifyInTrainerItems,
              cantidad: itemToModifyInTrainerItems.cantidad + 1,
            };
            const [trainerItemsResponse, storeItemsResponse, trainerResponse] =
              await Promise.allSettled([
                modifyTrainerItems(modifyTrainerItemsRequest),
                putStoreItem(modifyStoreItemsRequest),
                putTrainerInfo({
                  id_entrenador: trainer.id,
                  nombre: trainer.nombre,
                  dinero: trainer.dinero - itemToModifyInStoreItems.precio,
                }),
              ]);
            if (
              trainerItemsResponse.status === "fulfilled" &&
              storeItemsResponse.status === "fulfilled" &&
              trainerResponse.status === "fulfilled"
            ) {
              setMessage(
                `Acabas de comprar 1 ${
                  itemToModifyInTrainerItems.nombre_objeto
                }. Ahora tienes ${itemToModifyInTrainerItems.cantidad + 1} ${
                  itemToModifyInTrainerItems.nombre_objeto
                } en total.`
              );
              onOpen();
            } else {
              setMessage("Error modificando items en tienda y entrenador");
              onOpen();
            }
          } else {
            const addTrainerItemsRequest: PostTrainerItemRequest = {
              id_entrenador: getUserFromLocalStorage().id,
              nombre_entrenador: getUserFromLocalStorage().nombre,
              id_objeto: id_objeto,
              nombre_objeto: itemToModifyInStoreItems?.nombre_objeto!,
              cantidad: 1,
            };
            const [trainerItemsResponse, storeItemsResponse, trainerResponse] =
              await Promise.allSettled([
                addTrainerItem(addTrainerItemsRequest),
                putStoreItem(modifyStoreItemsRequest),
                putTrainerInfo({
                  id_entrenador: trainer.id,
                  nombre: trainer.nombre,
                  dinero: trainer.dinero - itemToModifyInStoreItems.precio,
                }),
              ]);
            if (
              trainerItemsResponse.status === "fulfilled" &&
              storeItemsResponse.status === "fulfilled" &&
              trainerResponse.status === "fulfilled"
            ) {
              setMessage(
                `Acabas de comprar 1 ${itemToModifyInStoreItems.nombre_objeto}. Ahora tienes 1 ${itemToModifyInStoreItems.nombre_objeto} en total.`
              );
              onOpen();
            } else {
              setMessage(
                "Error creando items en entrenador y modificando items en tienda"
              );
              onOpen();
            }
          }
        } else {
          setMessage("No te queda dinero suficiente para comprar este item.");
          onOpen();
        }
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    const getInfoToRender = async () => {
      try {
        setLoading(true);
        const userId = getUserFromLocalStorage().id;
        const [trainerResponse, trainerItemsResponse, storeItemsResponse] =
          await Promise.allSettled([
            getTrainerInfo({ id_entrenador: userId }),
            getTrainerItems({ id_entrenador: userId }),
            getStoreItems({ id_tienda: 1 }),
          ]);
        if (
          trainerResponse.status === "fulfilled" &&
          trainerItemsResponse.status === "fulfilled" &&
          storeItemsResponse.status === "fulfilled"
        ) {
          setTrainer(trainerResponse.value.trainer);
          setStoreItems(storeItemsResponse.value.objetos);
          setTrainerItems(trainerItemsResponse.value.objetos);
        } else {
          setMessage("Error obteniendo los objetos de la tienda");
        }
      } catch (e) {
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    };

    getInfoToRender();
  }, [message]);

  const storeItemsWithBag = storeItems.map((item) => {
    const quantity =
      trainerItems.find((e) => e.id_objeto === item.id_objeto)?.cantidad || 0;
    return {
      ...item,
      haveAlready: quantity,
    };
  });

  return (
    <>
      <div className="flex justify-end items-center w-full gap-10 my-5">
        <div>Dinero: {trainer?.dinero}</div>
        <Button color="danger" onClick={() => router.back()}>
          Regresar
        </Button>
      </div>
      <StoreTable items={storeItemsWithBag} buy={buy} loading={loading} />
      <MessageModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        message={message}
      />
    </>
  );
}
