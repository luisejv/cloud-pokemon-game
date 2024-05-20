"use client";
import { useRouter } from "next/navigation";
import CustomCard from "../../components/Card";

const options = [
  {
    id: 1,
    img: "https://d.furaffinity.net/art/blazingifrit/1475361156/1475361156.blazingifrit_zoruaeevee_background.jpg",
    label: "Atrapar pokemons",
    to: "/home/catch",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/originals/2a/77/4d/2a774d34ddacf4a4b049721da7e1fe7f.gif",
    label: "Ver mis pokemons",
    to: "/home/pokemons",
  },
  {
    id: 3,
    img: "https://media.istockphoto.com/id/1157925360/photo/pokemon-store-at-narita-airport.jpg?s=612x612&w=0&k=20&c=a1Zkxt9ThpqA23hEgKGCF2KSUw3dDxSyBmcKpX9QbQY=",
    label: "Comprar en tiendas",
    to: "/home/stores",
  },
];

export default function Home() {
  const router = useRouter();
  const goTo = (to: string) => {
    router.push(to);
  };
  return (
    <div className="flex justify-around w-full">
      {options.map((option) => (
        <CustomCard
          label={option.label}
          img={option.img}
          key={option.id}
          to={option.to}
          goTo={goTo}
        />
      ))}
    </div>
  );
}
