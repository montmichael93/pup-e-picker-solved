import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  setIsLoading,
  setAllDogs,
}: {
  isLoading: boolean;
  setAllDogs: (allDogs: Dog[]) => void;
  setIsLoading: (loadState: boolean) => void;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
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
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({
          name: nameInput,
          description: descriptionInput,
          image: imageInput,
          isFavorite: false,
        });

        setNameInput("");
        setDescriptionInput("");
        setImageInput("");
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        disabled={isLoading}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        cols={80}
        rows={10}
        placeholder={""}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        onChange={(e) => {
          setImageInput(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option
              value={pictureValue}
              key={pictureValue}
              placeholder={defaultSelectedImage}
            >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
