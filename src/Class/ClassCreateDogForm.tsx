import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

type formProps = {
  isLoading: boolean;
  activeComponents: ActiveComponent;
  setAllTheDogs: (allDogs: Dog[]) => void;
};

export class ClassCreateDogForm extends Component<formProps> {
  state = {
    nameInput: "",
    descriptionInput: "",
    imageInput: "",
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.props.setAllTheDogs(dogs);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  postDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(this.refetchData)
      .then(() => {
        toast.success("Dog Created!");
      })
      .finally(() => this.setState({ isLoading: false }));
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
              this.postDog({
                name: this.state.nameInput,
                description: this.state.descriptionInput,
                image: this.state.imageInput,
                isFavorite: false,
              });
              this.setState({ nameInput: "" });
              this.setState({ descriptionInput: "" });
              this.setState({ imageInput: defaultSelectedImage });
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
