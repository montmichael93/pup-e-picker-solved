import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  allDogs,
  favorited,
  unfavorited,
  isLoading,
  setAllDogs,
  setIsLoading,
  setSelectFavorites,
}: {
  allDogs: Dog[];
  selectFavorite: Dog | null;
  isLoading: boolean;
  favorited: boolean;
  unfavorited: boolean;
  setSelectFavorites: (selectFavorite: Dog | null) => void;
  setFavorited: (favorited: boolean) => void;
  setUnfavorited: (unfavorited: boolean) => void;
  setIsLoading: (loadState: boolean) => void;
  setAllDogs: (dog: Dog[]) => void;
}) => {
  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDogEntry = (dogId: number) => {
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(refetchData)
      .finally(() => setIsLoading(false));
  };

  const manageFavorites = (
    newFav: Dog,
    dogIdNumber: number,
    favoriteStatus: boolean
  ) => {
    setIsLoading(true);
    setSelectFavorites(newFav);
    Requests.updateDog(dogIdNumber, favoriteStatus)
      .then(refetchData)
      .finally(() => setIsLoading(false));
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {favorited
        ? allDogs
            .filter((dogEntry) => dogEntry.isFavorite === true)
            .map((dogEntry) => (
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
                  alert("clicked trash");
                  deleteDogEntry(dogEntry.id);
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                  dogEntry.isFavorite = false;
                  manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
                  dogEntry.isFavorite = true;
                  manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
                }}
                isLoading={isLoading}
              />
            ))
        : unfavorited
        ? allDogs
            .filter((dogEntry) => dogEntry.isFavorite === false)
            .map((dogEntry) => (
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
                  alert("clicked trash");
                  deleteDogEntry(dogEntry.id);
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                  dogEntry.isFavorite = false;
                  manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
                  dogEntry.isFavorite = true;
                  manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
                }}
                isLoading={isLoading}
              />
            ))
        : allDogs.map((dogEntry) => (
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
                alert("clicked trash");
                deleteDogEntry(dogEntry.id);
              }}
              onHeartClick={() => {
                alert("clicked heart");
                dogEntry.isFavorite = false;
                manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
              }}
              onEmptyHeartClick={() => {
                alert("clicked empty heart");
                dogEntry.isFavorite = true;
                manageFavorites(dogEntry, dogEntry.id, dogEntry.isFavorite);
              }}
              isLoading={isLoading}
            />
          ))}
    </>
  );
};
