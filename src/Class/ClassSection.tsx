// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveComponent, Dog } from "../types";

type propTypes = {
  dogs: Dog[];
  activeComponent: ActiveComponent;
  setActiveTabs: (tab: ActiveComponent) => void;
  children: ReactNode;
};

export class ClassSection extends Component<propTypes> {
  render() {
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to functional
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={
                this.props.activeComponent === "favorited"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                this.props.activeComponent === "favorited"
                  ? this.props.setActiveTabs("all-dogs")
                  : this.props.setActiveTabs("favorited");
              }}
            >
              favorited ({" "}
              {this.props.dogs.filter((dog) => dog.isFavorite === true).length}{" "}
              )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                this.props.activeComponent === "unfavorited"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                this.props.activeComponent === "unfavorited"
                  ? this.props.setActiveTabs("all-dogs")
                  : this.props.setActiveTabs("unfavorited");
              }}
            >
              unfavorited ({" "}
              {this.props.dogs.filter((dog) => dog.isFavorite === false).length}{" "}
              )
            </div>
            <div
              className={
                this.props.activeComponent === "created-dog-form"
                  ? `selector active`
                  : `selector`
              }
              onClick={() => {
                this.props.activeComponent === "created-dog-form"
                  ? this.props.setActiveTabs("all-dogs")
                  : this.props.setActiveTabs("created-dog-form");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
