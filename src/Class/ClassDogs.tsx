import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
type propItems = {
  allDogs: Dog[];
  isLoading: boolean;
  selectFavorite: Dog | null;
  favorited: boolean;
  unfavorited: boolean;
  setSelectFavorite: (chosenFavorite: Dog) => void;
  setFavorited: (status: boolean) => void;
  setUnfavorited: (status: boolean) => void;
  setNewDogForm: (status: boolean) => void;
};

export class ClassDogs extends Component<propItems> {
  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ allDogs: dogs });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDogEntry = (dogId: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(dogId)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: true }));
  };

  manageFavorites = (
    newFav: Dog,
    dogIdNumber: number,
    favoriteStatus: boolean
  ) => {
    this.setState({ isLoading: true });

    this.props.setSelectFavorite(newFav);

    Requests.updateDog(dogIdNumber, favoriteStatus)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: true }));
  };

  render() {
    {
      return this.props.favorited
        ? this.props.allDogs
            .filter((dogEntry) => dogEntry.isFavorite === true)
            .map((dogEntry) => (
              <DogCard
                dog={{
                  id: dogEntry.id,
                  image: dogEntry.image,
                  description: dogEntry.description,
                  isFavorite: dogEntry.isFavorite,
                  name: dogEntry.name,
                }}
                key={dogEntry.id}
                onTrashIconClick={() => {
                  alert("clicked trash");
                  this.deleteDogEntry(dogEntry.id);
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                  dogEntry.isFavorite = false;
                  this.manageFavorites(
                    dogEntry,
                    dogEntry.id,
                    dogEntry.isFavorite
                  );
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
                  dogEntry.isFavorite = true;
                  this.manageFavorites(
                    dogEntry,
                    dogEntry.id,
                    dogEntry.isFavorite
                  );
                }}
                isLoading={this.props.isLoading}
              />
            ))
        : this.props.unfavorited
        ? this.props.allDogs
            .filter((dogEntry) => dogEntry.isFavorite === false)
            .map((dogEntry) => (
              <DogCard
                dog={{
                  id: dogEntry.id,
                  image: dogEntry.image,
                  description: dogEntry.description,
                  isFavorite: dogEntry.isFavorite,
                  name: dogEntry.name,
                }}
                key={dogEntry.id}
                onTrashIconClick={() => {
                  alert("clicked trash");
                  this.deleteDogEntry(dogEntry.id);
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                  dogEntry.isFavorite = false;
                  this.manageFavorites(
                    dogEntry,
                    dogEntry.id,
                    dogEntry.isFavorite
                  );
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
                  dogEntry.isFavorite = true;
                  this.manageFavorites(
                    dogEntry,
                    dogEntry.id,
                    dogEntry.isFavorite
                  );
                }}
                isLoading={this.props.isLoading}
              />
            ))
        : this.props.allDogs.map((dogEntry) => (
            <DogCard
              dog={{
                id: dogEntry.id,
                image: dogEntry.image,
                description: dogEntry.description,
                isFavorite: dogEntry.isFavorite,
                name: dogEntry.name,
              }}
              key={dogEntry.id}
              onTrashIconClick={() => {
                alert("clicked trash");
                this.deleteDogEntry(dogEntry.id);
              }}
              onHeartClick={() => {
                alert("clicked heart");
                dogEntry.isFavorite = false;
                this.manageFavorites(
                  dogEntry,
                  dogEntry.id,
                  dogEntry.isFavorite
                );
              }}
              onEmptyHeartClick={() => {
                alert("clicked empty heart");
                dogEntry.isFavorite = true;
                this.manageFavorites(
                  dogEntry,
                  dogEntry.id,
                  dogEntry.isFavorite
                );
              }}
              isLoading={this.props.isLoading}
            />
          ));
    }
  }
}
