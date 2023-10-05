import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { set } from "zod";

type DogContextType = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoriteDogs: Dog[];
  unfavoriteDogs: Dog[];
};

const { getAllDogs } = Requests;

export const DogContext = createContext<DogContextType>({} as DogContextType);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);

  const fetchDogs = () => {
    getAllDogs().then((dogs) => {
        setDogs(dogs as Dog[]);
    }).catch((error) => {
        console.log("error", error);
    });
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <DogContext.Provider
      value={{ dogs, setDogs, favoriteDogs, unfavoriteDogs }}
    >
      {children}
    </DogContext.Provider>
  );
};
