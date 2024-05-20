"use client";
import PokemonTable from "@/components/PokemonTable";
import { getUserFromLocalStorage } from "@/lib/localStorage";
import { getTrainerPokemons } from "@/services/trainers";
import { TrainerPokemon } from "@/types/trainer-pokemons";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pokemons() {
  const [trainerPokemons, setTrainerPokemons] = useState<TrainerPokemon[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userId = getUserFromLocalStorage().id;
        const response = await getTrainerPokemons({ id_entrenador: userId });
        if (response) {
          setTrainerPokemons(response.pokemons);
        } else {
          throw "Error al traer pokemons de entrenador";
        }
      } catch (e) {
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex justify-end items-center w-full gap-10 my-5">
        <Button color="danger" onClick={() => router.back()}>
          Regresar
        </Button>
      </div>
      <PokemonTable
        loading={loading}
        pokemons={trainerPokemons || []}
      ></PokemonTable>
    </>
  );
}
