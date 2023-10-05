import { ReactNode, createContext, useState, useEffect } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type DogContextType = {
  dogs: Dog[];
  isLoading: boolean;
  favoriteDogs: Dog[];
  unfavoriteDogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  createDog: (newDog: Omit<Dog, "id">) => void;
  trashDog: (id: number) => void;
  favoriteDog: (id: number) => void;
  unfavoriteDog: (id: number) => void;
};

const { getAllDogs, postDog, deleteDogRequest, patchFavoriteForDog } = Requests;

export const DogContext = createContext<DogContextType>({} as DogContextType);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);

  const refetchDogs = () => {
    getAllDogs()
      .then((dogs) => setDogs(dogs as Dog[]))
      .catch((error) => console.log("error", error));
  };

  const createDog = (newDog: Omit<Dog, "id">) => {
    setIsLoading(true);

    postDog(newDog)
      .then((status) => {
        if (status === 201) {
          refetchDogs();
          toast.success("Dog Created!");
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  };

  const trashDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));

    deleteDogRequest(id)
      .then((status) => {
        if (status !== 200) setDogs(dogs);
      })
      .catch((error) => console.log("error", error));
  };

  const favoriteDog = (id: number) => {
    const newDogs = dogs.map((dog) =>
      dog.id === id ? { ...dog, isFavorite: true } : dog
    );
    setDogs(newDogs);

    patchFavoriteForDog(id, true)
      .then((status) => {
        if (status !== 200) setDogs(dogs);
      })
      .catch((error) => console.log("error", error));
  };

  const unfavoriteDog = (id: number) => {
    const newDogs = dogs.map((dog) =>
      dog.id === id ? { ...dog, isFavorite: false } : dog
    );
    setDogs(newDogs);

    patchFavoriteForDog(id, false)
      .then((status) => {
        if (status !== 200) setDogs(dogs);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => refetchDogs(), []);

  const providerValue = {
    dogs,
    setDogs,
    isLoading,
    favoriteDogs,
    unfavoriteDogs,
    createDog,
    trashDog,
    favoriteDog,
    unfavoriteDog,
  };

  return (
    <DogContext.Provider value={providerValue}>{children}</DogContext.Provider>
  );
};
