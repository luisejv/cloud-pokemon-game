import axios from "axios";

// axios.defaults.headers.post["Content-Type"] = "application/json";

export const API_Pokemons = axios.create({
  baseURL: "http://lb-prod-434981237.us-east-1.elb.amazonaws.com:8000/",
  timeout: 1000,
});
