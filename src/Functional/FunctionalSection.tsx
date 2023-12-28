// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveComponent, Dog } from "../types";

export const FunctionalSection = ({
  dogs,
  children,
  activeComponent,
  setActiveTabs,
}: {
  dogs: Dog[];
  children: ReactNode;
  activeComponent: ActiveComponent;
  setActiveTabs: (tab: ActiveComponent) => void;
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
            className={
              activeComponent === "favorited" ? `selector active` : `selector`
            }
            onClick={() => {
              activeComponent === "favorited"
                ? setActiveTabs("all-dogs")
                : setActiveTabs("favorited");
            }}
          >
            favorited ( {dogs.filter((dog) => dog.isFavorite === true).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              activeComponent === "unfavorited" ? `selector active` : `selector`
            }
            onClick={() => {
              activeComponent === "unfavorited"
                ? setActiveTabs("all-dogs")
                : setActiveTabs("unfavorited");
            }}
          >
            unfavorited ({" "}
            {dogs.filter((dog) => dog.isFavorite === false).length} )
          </div>
          <div
            className={
              activeComponent === "created-dog-form"
                ? `selector active`
                : `selector`
            }
            onClick={() => {
              activeComponent === "created-dog-form"
                ? setActiveTabs("all-dogs")
                : setActiveTabs("created-dog-form");
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
