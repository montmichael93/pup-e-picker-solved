import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all-dogs");

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
  const filteredDogs = ((): Dog[] => {
    switch (activeComponent) {
      case "all-dogs":
        return allDogs;
      case "created-dog-form":
        return [];
      case "favorited":
        return favoritedDogs;
      case "unfavorited":
        return unfavoritedDogs;
    }
  })();

  useEffect(() => {
    //this function gets called whenever anything inside of b changes
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        console.table(dogs);
        setAllDogs(dogs);
        console.table(dogs);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(refetchData)
      .then(() => {
        toast.success("Dog Created!");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
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
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        dogs={allDogs}
        activeComponent={activeComponent}
        setActiveTabs={setActiveComponent}
      >
        <FunctionalDogs
          dogs={filteredDogs}
          isLoading={isLoading}
          activeComponents={activeComponent}
          deleteDogEntry={deleteDogEntry}
          manageFavorites={manageFavorites}
        />
        <FunctionalCreateDogForm
          isLoading={isLoading}
          activeComponents={activeComponent}
          postDog={postDog}
        />
      </FunctionalSection>
    </div>
  );
}
