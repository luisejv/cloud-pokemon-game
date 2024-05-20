"use client";
import { useState } from "react";
import { Button, Input, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { loginTrainer } from "@/services/trainers";
import { setUserToLocalStorage } from "@/lib/localStorage";

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    try {
      if (username) {
        const response = await loginTrainer({ username });
        setUserToLocalStorage(response.trainer);
        router.push("/home");
      }
    } catch (e) {
      console.log("Error: ", e);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center w-1/3 justify-between">
      <Input
        type="text"
        label="Username"
        isRequired
        placeholder="Your username here"
        className="max-w-xs"
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && login()}
      ></Input>
      <Spacer x={4} />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => login()}
        isLoading={loading}
      >
        Entrar
      </Button>
    </div>
  );
}
