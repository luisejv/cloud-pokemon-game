import axios from "axios";

export const API_Stores = axios.create({
  baseURL: "http://lb-prod-839341276.us-east-1.elb.amazonaws.com:8000/",
  timeout: 1000,
});
