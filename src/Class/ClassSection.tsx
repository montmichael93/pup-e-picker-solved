// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type propTypes = {
  allDogs: Dog[];
  favorited: boolean;
  unfavorited: boolean;
  showNewDogForm: boolean;
  setFavorited: (status: boolean) => void;
  setUnfavorited: (status: boolean) => void;
  setShowNewDogForm: (status: boolean) => void;
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
              className={this.props.favorited ? `selector active` : `selector`}
              onClick={() => {
                !this.props.favorited
                  ? this.props.setFavorited(true)
                  : this.props.setFavorited(false);
                this.props.unfavorited && this.props.setUnfavorited(false);
                this.props.showNewDogForm &&
                  this.props.setShowNewDogForm(false);
              }}
            >
              favorited ({" "}
              {
                this.props.allDogs.filter((dog) => dog.isFavorite === true)
                  .length
              }{" "}
              )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                this.props.unfavorited ? `selector active` : `selector`
              }
              onClick={() => {
                !this.props.unfavorited
                  ? this.props.setUnfavorited(true)
                  : this.props.setUnfavorited(false);
                this.props.favorited && this.props.setFavorited(false);
                this.props.showNewDogForm &&
                  this.props.setShowNewDogForm(false);
              }}
            >
              unfavorited ({" "}
              {
                this.props.allDogs.filter((dog) => dog.isFavorite === false)
                  .length
              }{" "}
              )
            </div>
            <div
              className={
                this.props.showNewDogForm ? `selector active` : `selector`
              }
              onClick={() => {
                !this.props.showNewDogForm
                  ? this.props.setShowNewDogForm(true)
                  : this.props.setShowNewDogForm(false);
                this.props.favorited && this.props.setFavorited(false);
                this.props.unfavorited && this.props.setUnfavorited(false);
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
