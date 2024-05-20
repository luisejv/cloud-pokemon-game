import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";

type PokemonInfoProps = {
  nombre: string;
  tipo: string;
  hp: number;
  nivel: number;
};

const PokemonInfo = ({ nombre, tipo, hp, nivel }: PokemonInfoProps) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{nombre}</p>
          <p className="text-small text-default-500">{tipo}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>Nivel: {nivel}</div>
        <div>HP: {hp}</div>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PokemonInfo;
