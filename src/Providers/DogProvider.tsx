import { ReactNode, createContext, useState, useEffect } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { set } from "zod";

type DogContextType = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoriteDogs: Dog[];
  unfavoriteDogs: Dog[];
  createDog: (newDog: Omit<Dog, "id">) => void;
  trashDog: (id: number) => void;
  favoriteDog: (id: number) => void;
  unfavoriteDog: (id: number) => void;
};

const { getAllDogs, postDog, deleteDogRequest, patchFavoriteForDog } = Requests;

export const DogContext = createContext<DogContextType>({} as DogContextType);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);

  const createDog = (newDog: Omit<Dog, "id">) => {
    const newId = dogs[dogs.length - 1].id + 1;
    setDogs([...dogs, { ...newDog, id: newId }]);

    postDog(newDog)
      .then((status) => {
        if (status !== 201) setDogs(dogs);
      })
      .catch((error) => console.log("error", error));
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

  useEffect(() => {
    getAllDogs()
      .then((dogs) => {
        setDogs(dogs as Dog[]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const providerValue = {
    dogs,
    setDogs,
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
