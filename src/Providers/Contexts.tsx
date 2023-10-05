import { useContext } from "react";
import { ViewContext } from "../Providers/ViewProvider";
import { DogContext } from "../Providers/DogProvider";

export const useView = () => useContext(ViewContext);

export const useDogs = () => useContext(DogContext);
