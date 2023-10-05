import { useDogs, useView } from "../Providers/Contexts";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const {
    dogs,
    favoriteDogs,
    unfavoriteDogs,
    isLoading,
    favoriteDog,
    unfavoriteDog,
    trashDog,
  } = useDogs();
  const { view } = useView();
  const currentDogs =
    view === "allDogs"
      ? dogs
      : view === "favoriteDogs"
      ? favoriteDogs
      : unfavoriteDogs;

  return (
    <>
      {currentDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => trashDog(dog.id)}
          onEmptyHeartClick={() => favoriteDog(dog.id)}
          onHeartClick={() => unfavoriteDog(dog.id)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
