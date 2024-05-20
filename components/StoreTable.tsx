import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { StoreItem } from "@/types/store-items";

const columns = [
  { name: "Item", uid: "name" },
  { name: "Precio", uid: "precio" },
  { name: "Stock", uid: "stock" },
  { name: "Estado", uid: "status" },
  { name: "En Mochila", uid: "haveAlready" },
  { name: "Opciones", uid: "actions" },
];

type StoreItemWithBag = StoreItem & { haveAlready: number };

type StoreTableProps = {
  items: StoreItemWithBag[];
  buy: (id_objeto: number) => void;
  loading: boolean;
};

const StoreTable = ({ items, buy, loading }: StoreTableProps) => {
  const renderCell = React.useCallback(
    (item: StoreItemWithBag, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof StoreItemWithBag];

      switch (columnKey) {
        case "name":
          return <p style={{ color: "#000" }}>{item.nombre_objeto}</p>;
        case "stock":
          return <p style={{ color: "#000" }}>{item.stock}</p>;
        case "precio":
          return <p style={{ color: "#000" }}>{item.precio}</p>;
        case "haveAlready":
          return <p style={{ color: "#000" }}>{item.haveAlready}</p>;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={item.stock === 0 ? "warning" : "success"}
              size="sm"
              variant="flat"
            >
              {item.stock === 0 ? "Agotado" : "En Stock"}
            </Chip>
          );
        case "actions":
          return (
            <Button color="primary" onClick={() => buy(item.id_objeto)}>
              Comprar
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [buy]
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
      <TableBody items={items} emptyContent={loading ? "Cargando..." : ""}>
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

export default StoreTable;
