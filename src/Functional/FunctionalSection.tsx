// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export const FunctionalSection = ({
  allDogs,
  showNewDogForm,
  favorited,
  unfavorited,
  setShowNewDogForm,
  setFavorited,
  setUnfavorited,
  children,
}: {
  allDogs: Dog[];
  showNewDogForm: boolean;
  favorited: boolean;
  unfavorited: boolean;
  setFavorited: (favorited: boolean) => void;
  setUnfavorited: (unfavorited: boolean) => void;
  setShowNewDogForm: (shouldShowForm: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={favorited ? `selector active` : `selector`}
            onClick={() => {
              !favorited ? setFavorited(true) : setFavorited(false);
              unfavorited && setUnfavorited(false);
              showNewDogForm && setShowNewDogForm(false);
            }}
          >
            favorited ({" "}
            {allDogs.filter((dog) => dog.isFavorite === true).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={unfavorited ? `selector active` : `selector`}
            onClick={() => {
              !unfavorited ? setUnfavorited(true) : setUnfavorited(false);
              favorited && setFavorited(false);
              showNewDogForm && setShowNewDogForm(false);
            }}
          >
            unfavorited ({" "}
            {allDogs.filter((dog) => dog.isFavorite === false).length} )
          </div>
          <div
            className={showNewDogForm ? `selector active` : `selector`}
            onClick={() => {
              !showNewDogForm
                ? setShowNewDogForm(true)
                : setShowNewDogForm(false);
              favorited && setFavorited(false);
              unfavorited && setUnfavorited(false);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
