import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";

export function FunctionalApp() {
  const getAllDogs = () =>
    fetch("http://Localhost:3000/dogs").then((response) => response.json());

  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectFavorite, setSelectFavorite] = useState<Dog | null>(null);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [unfavorited, setUnfavorited] = useState<boolean>(false);
  const [showNewDogForm, setShowNewDogForm] = useState<boolean>(false);

  useEffect(() => {
    //this function gets called whenever anything inside of b changes
    getAllDogs().then(setAllDogs);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>

      <FunctionalSection
        allDogs={allDogs}
        showNewDogForm={showNewDogForm}
        favorited={favorited}
        unfavorited={unfavorited}
        setFavorited={(favorited: boolean) => {
          setFavorited(favorited);
        }}
        setUnfavorited={(unfavorited: boolean) => {
          setUnfavorited(unfavorited);
        }}
        setShowNewDogForm={(shouldShowForm: boolean) => {
          setShowNewDogForm(shouldShowForm);
        }}
      >
        {!showNewDogForm ? (
          <>
            <FunctionalDogs
              allDogs={allDogs}
              selectFavorite={selectFavorite}
              favorited={favorited}
              unfavorited={unfavorited}
              isLoading={isLoading}
              setAllDogs={(dogs: Dog[]) => {
                setAllDogs(dogs);
              }}
              setSelectFavorites={(selectFavorite: Dog | null) => {
                setSelectFavorite(selectFavorite);
              }}
              setFavorited={(favorited: boolean) => {
                setFavorited(favorited);
              }}
              setUnfavorited={(unfavorited: boolean) => {
                setUnfavorited(unfavorited);
              }}
              setIsLoading={(loadState: boolean) => {
                setIsLoading(loadState);
              }}
            />
          </>
        ) : (
          <>
            <FunctionalCreateDogForm
              setAllDogs={(allDogs: Dog[]) => {
                setAllDogs(allDogs);
              }}
              isLoading={isLoading}
              setIsLoading={(loadState: boolean) => {
                setIsLoading(loadState);
              }}
            />
          </>
        )}
      </FunctionalSection>
    </div>
  );
}
