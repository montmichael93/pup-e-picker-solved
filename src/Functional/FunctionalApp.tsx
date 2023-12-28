import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { ActiveComponent, Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all-dogs");

  const getAllDogs = () =>
    fetch("http://Localhost:3000/dogs").then((response) => response.json());

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
  const filteredDogs = (() => {
    if (activeComponent === "favorited") return favoritedDogs;
    if (activeComponent === "unfavorited") return unfavoritedDogs;
    if (activeComponent === "created-dog-form") return [];
    else return allDogs;
  })();

  useEffect(() => {
    //this function gets called whenever anything inside of b changes
    getAllDogs().then(setAllDogs);
  }, []);

  const setActiveTab = (tabtype: ActiveComponent) => {
    setActiveComponent(tabtype);
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        dogs={allDogs}
        activeComponent={activeComponent}
        setActiveTabs={(tab) => {
          setActiveTab(tab);
        }}
      >
        <FunctionalDogs
          dogs={filteredDogs}
          isLoading={isLoading}
          activeComponents={activeComponent}
          setAllDogs={(dogs: Dog[]) => {
            setAllDogs(dogs);
          }}
          setIsLoading={(loadState: boolean) => {
            setIsLoading(loadState);
          }}
        />
        <FunctionalCreateDogForm
          activeComponents={activeComponent}
          setAllDogs={(allDogs: Dog[]) => {
            setAllDogs(allDogs);
          }}
          isLoading={isLoading}
          setIsLoading={(loadState: boolean) => {
            setIsLoading(loadState);
          }}
        />
      </FunctionalSection>
    </div>
  );
}
