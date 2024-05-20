import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

type TrainerOptionsProps = {
  pokeballs?: number;
  showNiceTry: boolean;
  showErrorMessage: boolean;
  catched: boolean;
  onCatch: () => void;
  onBack: () => void;
};

const TrainerOptions = ({
  pokeballs,
  showNiceTry,
  showErrorMessage,
  onCatch,
  onBack,
  catched,
}: TrainerOptionsProps) => {
  return (
    <Card className="max-w-[400px]">
      <CardBody className="gap-4">
        {showErrorMessage ? (
          <>
            <div>
              No tienes pokebolas suficientes para poder capturar pokemons.
              Puedes comprar algunas en las tiendas.
            </div>
            <Button color="danger" onClick={() => onBack()}>
              Regresar
            </Button>
          </>
        ) : (
          <>
            {showNiceTry && <div>¡Oops! Estuviste cerca</div>}
            {catched ? (
              <Button color="danger" onClick={() => onBack()}>
                Regresar
              </Button>
            ) : (
              <>
                <div>Tienes {pokeballs} pokebolas. ¿Qué deseas hacer?</div>
                <Button color="success" onClick={() => onCatch()}>
                  Atrapar
                </Button>
                <Button color="danger" onClick={() => onBack()}>
                  Regresar
                </Button>
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default TrainerOptions;
