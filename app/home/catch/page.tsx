"use client";
import PokemonInfo from "@/components/PokemonInfo";
import TrainerOptions from "@/components/TrainerOptions";
import { getPokemons } from "@/services/pokemons";
import {
  catchPokemon,
  getTrainerItems,
  modifyTrainerItems,
} from "@/services/trainers";
import { getUserFromLocalStorage } from "@/lib/localStorage";
import { Pokemon } from "@/types/pokemon";
import { Trainer } from "@/types/trainer";
import { TrainerItem } from "@/types/trainer-items";
import { PostTrainerPokemonRequest } from "@/types/trainer-pokemons";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Catch() {
  const [trainer, setTrainer] = useState<Trainer>();
  const [trainerItems, setTrainerItems] = useState<TrainerItem[]>();
  const [pokemonToShow, setPokemonToShow] = useState<
    Pokemon & Partial<PostTrainerPokemonRequest>
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [catched, setCatched] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showNiceTry, setShowNiceTry] = useState<boolean>(false);
  const router = useRouter();

  const getRandomPokemon = (
    pokemons: Pokemon[]
  ): Pokemon & Partial<PostTrainerPokemonRequest> => {
    const randomIndex = Math.floor(Math.random() * (pokemons.length - 1));
    const randomPokemon = pokemons[randomIndex];
    const level = Math.floor(Math.random() * (100 - 5)) + 5;
    return {
      ...randomPokemon,
      hp: Math.floor(Math.random() * (level * 3 - 17)) + 17,
      nivel: level,
      nombre_pokemon: randomPokemon.nombre,
      id_pokemon: randomPokemon.id,
    };
  };

  const onCatch = async () => {
    try {
      setShowNiceTry(false);
      if (pokemonToShow && trainer && trainerItems) {
        const pokeballs = trainerItems.find(
          (item) => item.nombre_objeto === "pokebola"
        );
        if (pokeballs && pokeballs.cantidad > 0) {
          await modifyTrainerItems({
            ...pokeballs,
            cantidad: pokeballs.cantidad - 1,
          });
          const catchTry = Math.floor(Math.random() * 100);
          if (catchTry <= pokemonToShow.catchrate) {
            const response = await catchPokemon({
              hp: pokemonToShow.hp!,
              id_entrenador: trainer.id,
              id_pokemon: pokemonToShow.id_pokemon!,
              nivel: pokemonToShow.nivel!,
              nombre_entrenador: trainer.nombre,
              nombre_pokemon: pokemonToShow.nombre,
              sprite: pokemonToShow.sprite,
              tipo: pokemonToShow.tipo,
            });
            if (response) {
              setCatched(true);
            } else {
              throw "Error atrapando al pokemon";
            }
          } else {
            setShowNiceTry(true);
          }
        } else {
          setShowErrorMessage(true);
        }
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    const getInfoForCatch = async () => {
      setLoading(true);
      try {
        setTrainer(getUserFromLocalStorage());
        const response = await getPokemons();
        if (response) {
          const randomPokemon = getRandomPokemon(response.pokemons);
          setPokemonToShow(randomPokemon);
        } else {
          throw "Error GET Pokemons";
        }
      } catch (e) {
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    };

    getInfoForCatch();
  }, []);

  useEffect(() => {
    const getInfoForCatch = async () => {
      try {
        const userId = getUserFromLocalStorage().id;
        const response = await getTrainerItems({ id_entrenador: userId });
        if (response) {
          setTrainerItems(response.objetos);
        } else {
          throw "Error GET TrainerItems";
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    getInfoForCatch();
  }, [showNiceTry]);

  const pokeballs =
    trainerItems?.find((i) => i.nombre_objeto === "pokebola")?.cantidad || 0;

  return (
    <section>
      {loading ? (
        <>Loading</>
      ) : (
        pokemonToShow && (
          <div className="container">
            <div className="grid grid-cols-2 gap-4">
              {catched ? (
                <>
                  <div>
                    <Card>
                      <CardBody>
                        <p>
                          ¡Felicitaciones, atrapaste a {pokemonToShow.nombre}!
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                  <div>
                    <Image
                      unoptimized
                      src={"/pokeball.png"}
                      alt={""}
                      width={200}
                      height={50}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <PokemonInfo
                      hp={pokemonToShow?.hp || 0}
                      nivel={pokemonToShow?.nivel || 0}
                      nombre={pokemonToShow?.nombre_pokemon || ""}
                      tipo={pokemonToShow?.tipo || ""}
                    />
                  </div>
                  <div>
                    <Image
                      unoptimized
                      src={pokemonToShow?.sprite || ""}
                      alt={pokemonToShow?.nombre_pokemon || ""}
                      width={200}
                      height={50}
                    />
                  </div>
                </>
              )}
              <div>
                <Image
                  unoptimized
                  src={"/trainer-back-sprite.png"}
                  alt={""}
                  width={200}
                  height={50}
                />
              </div>
              <div>
                <TrainerOptions
                  catched={catched}
                  pokeballs={pokeballs}
                  showNiceTry={showNiceTry}
                  showErrorMessage={showErrorMessage}
                  onBack={() => router.back()}
                  onCatch={() => onCatch()}
                />
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
