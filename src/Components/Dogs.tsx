import { useDogs, useView } from "../Providers/Contexts";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { dogs, favoriteDogs, unfavoriteDogs } = useDogs();
  const { view, isLoading, setIsLoading } = useView();
  const currentDogs =
    view === "allDogs"
      ? dogs
      : view === "favoriteDogs"
      ? favoriteDogs
      : unfavoriteDogs;

  const handleTrashIconClick = async (id: number) => {
    setIsLoading(true);
    // fill out method
    setIsLoading(false);
  };

  const handleEmptyHeartClick = async (id: number) => {
    setIsLoading(true);
    // fill out method
    setIsLoading(false);
  };

  const handleHeartClick = async (id: number) => {
    setIsLoading(true);
    // fill out method
    setIsLoading(false);
  };

  return (
    <>
      {currentDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => {}}
          onEmptyHeartClick={() => {}}
          onHeartClick={() => {}}
          isLoading={false}
        />
      ))}
    </>
  );
};
