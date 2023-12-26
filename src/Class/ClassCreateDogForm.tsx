import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type formProps = {
  isLoading: boolean;
  allDogs: Dog[];
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
    );
  }
}
