import axios from "axios";

export const API_Trainers = axios.create({
  baseURL: "http://lb-prod-1029086061.us-east-1.elb.amazonaws.com:8000/",
  timeout: 1000,
});
