import { DogCard } from "../Shared/DogCard";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  isLoading,
  activeComponents,
  setAllDogs,
  setIsLoading,
}: {
  dogs: Dog[];
  isLoading: boolean;
  activeComponents: ActiveComponent;
  setIsLoading: (loadState: boolean) => void;
  setAllDogs: (dog: Dog[]) => void;
}) => {
  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  const adjustFavorites = (status: boolean) => {
    if (status === true) {
      return false;
    } else return true;
  };

  const deleteDogEntry = (dogId: number) => {
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(refetchData)
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  const manageFavorites = (dogIdNumber: number, favoriteStatus: boolean) => {
    setIsLoading(true);
    Requests.updateDog(dogIdNumber, favoriteStatus)
      .then(refetchData)
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {activeComponents != "created-dog-form" &&
        dogs.map((dogEntry) => (
          <DogCard
            dog={{
              id: dogEntry.id,
              image: dogEntry.image,
              description: dogEntry.description,
              isFavorite: dogEntry.isFavorite,
              name: dogEntry.name,
            }}
            key={dogEntry.id}
            onTrashIconClick={() => {
              deleteDogEntry(dogEntry.id);
            }}
            onHeartClick={() => {
              manageFavorites(
                dogEntry.id,
                adjustFavorites(dogEntry.isFavorite)
              );
            }}
            onEmptyHeartClick={() => {
              manageFavorites(
                dogEntry.id,
                adjustFavorites(dogEntry.isFavorite)
              );
            }}
            isLoading={isLoading}
          />
        ))}
    </>
  );
};
