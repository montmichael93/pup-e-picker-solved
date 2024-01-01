import { DogCard } from "../Shared/DogCard";
import { ActiveComponent, Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  isLoading,
  activeComponents,
  deleteDogEntry,
  manageFavorites,
}: {
  dogs: Dog[];
  isLoading: boolean;
  activeComponents: ActiveComponent;
  deleteDogEntry: (dogId: number) => void;
  manageFavorites: (dogIdNumber: number, favoriteStatus: boolean) => void;
}) => {
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
              manageFavorites(dogEntry.id, !dogEntry.isFavorite);
            }}
            onEmptyHeartClick={() => {
              manageFavorites(dogEntry.id, !dogEntry.isFavorite);
            }}
            isLoading={isLoading}
          />
        ))}
    </>
  );
};
