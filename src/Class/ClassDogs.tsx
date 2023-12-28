import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
type propItems = {
  dogs: Dog[];
  isLoading: boolean;
  activeComponents: ActiveComponent;
  setIsLoading: (loadState: boolean) => void;
  setAllDogs: (dog: Dog[]) => void;
};

export class ClassDogs extends Component<propItems> {
  render() {
    const refetchData = () => {
      this.setState({ isLoading: true });
      return Requests.getAllDogs()
        .then((dogs) => {
          this.setState({ dogs: dogs });
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    };

    const adjustFavorites = (status: boolean) => {
      if (status === true) {
        return false;
      } else return true;
    };

    const deleteDogEntry = (dogId: number) => {
      this.setState({ isLoading: true });
      Requests.deleteDog(dogId)
        .then(refetchData)
        .catch((error) => {
          alert(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    };

    const manageFavorites = (dogIdNumber: number, favoriteStatus: boolean) => {
      this.setState({ isLoading: true });
      Requests.updateDog(dogIdNumber, adjustFavorites(favoriteStatus))
        .then(refetchData)
        .catch((error) => {
          alert(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    };
    return (
      this.props.activeComponents != "created-dog-form" &&
      this.props.dogs.map((dogEntry) => (
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
            deleteDogEntry(dogEntry.id);
          }}
          onHeartClick={() => {
            manageFavorites(dogEntry.id, dogEntry.isFavorite);
          }}
          onEmptyHeartClick={() => {
            manageFavorites(dogEntry.id, dogEntry.isFavorite);
          }}
          isLoading={this.props.isLoading}
        />
      ))
    );
  }
}
