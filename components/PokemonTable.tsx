import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { TrainerPokemon } from "@/types/trainer-pokemons";

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Tipo", uid: "type" },
  { name: "Nivel", uid: "level" },
  { name: "HP", uid: "hp" },
];

type PokemonTableProps = {
  pokemons: TrainerPokemon[];
  loading: boolean;
};

const PokemonTable = ({ pokemons, loading }: PokemonTableProps) => {
  const renderCell = React.useCallback(
    (item: TrainerPokemon, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof TrainerPokemon];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: item.sprite }}
              description={item.nombre_pokemon}
              name={cellValue}
            >
              {item.nombre_pokemon}
            </User>
          );
        case "type":
          return <p style={{ color: "#000" }}>{item.tipo}</p>;
        case "level":
          return <p style={{ color: "#000" }}>{item.nivel}</p>;
        case "hp":
          return <p style={{ color: "#000" }}>{item.HP}</p>;
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Store Items" color="secondary">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={pokemons} emptyContent={loading ? "Cargando..." : ""}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PokemonTable;
