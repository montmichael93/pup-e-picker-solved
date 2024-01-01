import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { ActiveComponent, Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

type formProps = {
  isLoading: boolean;
  activeComponents: ActiveComponent;
  postDog: (dog: Omit<Dog, "id">) => void;
};

export class ClassCreateDogForm extends Component<formProps> {
  state = {
    nameInput: "",
    descriptionInput: "",
    imageInput: "",
  };

  render() {
    return (
      <>
        {this.props.activeComponents === "created-dog-form" && (
          <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.postDog({
                name: this.state.nameInput,
                description: this.state.descriptionInput,
                image:
                  this.state.imageInput === ""
                    ? defaultSelectedImage
                    : this.state.imageInput,
                isFavorite: false,
              });
              this.setState({ nameInput: "" });
              this.setState({ descriptionInput: "" });
              this.setState({ imageInput: "" });
            }}
          >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
              type="text"
              name="name"
              value={this.state.nameInput}
              onChange={(e) => {
                this.setState({ nameInput: e.target.value });
              }}
              disabled={this.props.isLoading}
            />

            <label htmlFor="description">Dog Description</label>
            <textarea
              name="description"
              cols={80}
              rows={10}
              value={this.state.descriptionInput}
              onChange={(e) => {
                this.setState({ descriptionInput: e.target.value });
              }}
              disabled={this.props.isLoading}
            ></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
              onChange={(e) => {
                this.setState({ imageInput: e.target.value });
              }}
            >
              {Object.entries(dogPictures).map(([label, pictureValue]) => {
                return (
                  <option value={pictureValue} key={pictureValue}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input type="submit" disabled={this.props.isLoading} />
          </form>
        )}
      </>
    );
  }
}
