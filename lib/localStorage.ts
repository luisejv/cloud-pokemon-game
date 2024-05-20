import { Trainer } from "@/types/trainer";

function getUserFromLocalStorage(): Trainer {
  return JSON.parse(localStorage.getItem("user") || "");
}

function setUserToLocalStorage(user: Trainer) {
  localStorage.setItem("user", JSON.stringify(user));
}

export { getUserFromLocalStorage, setUserToLocalStorage };
