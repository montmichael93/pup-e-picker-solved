import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { ActiveComponent, Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
type propItems = {
  dogs: Dog[];
  isLoading: boolean;
  activeComponents: ActiveComponent;
  deleteDogEntry: (dogId: number) => void;
  manageFavorites: (dogIdNumber: number, favoriteStatus: boolean) => void;
};

export class ClassDogs extends Component<propItems> {
  render() {
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
            this.props.deleteDogEntry(dogEntry.id);
          }}
          onHeartClick={() => {
            this.props.manageFavorites(dogEntry.id, !dogEntry.isFavorite);
          }}
          onEmptyHeartClick={() => {
            this.props.manageFavorites(dogEntry.id, !dogEntry.isFavorite);
          }}
          isLoading={this.props.isLoading}
        />
      ))
    );
  }
}
