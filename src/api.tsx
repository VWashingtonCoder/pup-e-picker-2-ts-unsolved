import { Dog } from "./types";
const API_URL = "http://localhost:3000/dogs";

const getAllDogs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const postDog = async (newDog: Omit<Dog, "id">) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  });
  return response.status;
};
const deleteDogRequest = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.status;
};

const patchFavoriteForDog = async (id: number, isFavorite: boolean) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite }),
  });
  return response.json();
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
