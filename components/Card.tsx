import { Card, CardFooter, Image, Button } from "@nextui-org/react";

type CustomCardProps = {
  img: string;
  label: string;
  to: string;
  goTo: (to: string) => void;
};

export default function CustomCard({ img, label, to, goTo }: CustomCardProps) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
      style={{ width: 300, height: 350 }}
    >
      <Image
        alt={label}
        className="object-cover"
        height={350}
        src={img || "https://nextui.org/images/hero-card.jpeg"}
        width={300}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-large ml-1 z-10">
        <p className="text-tiny text-white/80">{label}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={() => goTo(to)}
        >
          Ir
        </Button>
      </CardFooter>
    </Card>
  );
}
