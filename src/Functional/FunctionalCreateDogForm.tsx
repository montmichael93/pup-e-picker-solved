import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  activeComponents,
  setIsLoading,
  setAllDogs,
}: {
  isLoading: boolean;
  activeComponents: ActiveComponent;
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
      .catch((error) => {
        alert(error);
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
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {activeComponents === "created-dog-form" && (
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

            descriptionInput != defaultSelectedImage &&
              setImageInput(defaultSelectedImage);
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
            value={descriptionInput}
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
                <option value={pictureValue} key={pictureValue}>
                  {label}
                </option>
              );
            })}
          </select>
          <input type="submit" disabled={isLoading} />
        </form>
      )}
    </>
  );
};
