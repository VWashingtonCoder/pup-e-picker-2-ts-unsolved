import { Dog } from "./types";
const API_URL = "http://localhost:3000";

const getAllDogs = async () => {
  // fill out method
  const response = await fetch(`${API_URL}/dogs`);
  const dogs = response.json();
  return dogs;
};

const postDog = () => {
  // fill out method
};
const deleteDogRequest = () => {
  // fill out method
};

const patchFavoriteForDog = () => {
  // fill out method
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
