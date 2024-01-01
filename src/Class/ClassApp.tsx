import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type State = {
  dogs: Dog[] | [];
  isLoading: boolean;
  activeComponent: ActiveComponent;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    dogs: [],
    isLoading: false,
    activeComponent: "all-dogs",
  };

  componentDidMount() {
    Requests.getAllDogs().then((dogs) => {
      this.setState({ dogs: dogs });
    });
  }

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        console.table(dogs);
        this.setState({ dogs: dogs });
        console.table(dogs);
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
      .catch((error) => {
        alert(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDogEntry = (dogId: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(dogId)
      .then(this.refetchData)
      .catch((error) => {
        alert(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  manageFavorites = (dogIdNumber: number, favoriteStatus: boolean) => {
    this.setState({ isLoading: true });
    Requests.updateDog(dogIdNumber, favoriteStatus)
      .then(this.refetchData)
      .catch((error) => {
        alert(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const favoritedDogs = this.state.dogs.filter((dog) => dog.isFavorite);
    const unfavoritedDogs = this.state.dogs.filter((dog) => !dog.isFavorite);

    const filteredDogs = (() => {
      if (this.state.activeComponent === "favorited") return favoritedDogs;
      if (this.state.activeComponent === "unfavorited") return unfavoritedDogs;
      if (this.state.activeComponent === "created-dog-form") return [];
      else return this.state.dogs;
    })();

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          dogs={this.state.dogs}
          activeComponent={this.state.activeComponent}
          setActiveTabs={(tab) => {
            this.setState({ activeComponent: tab });
          }}
        >
          {/* should be inside of the ClassSection component using react children */}

          <ClassDogs
            dogs={filteredDogs}
            isLoading={this.state.isLoading}
            activeComponents={this.state.activeComponent}
            deleteDogEntry={this.deleteDogEntry}
            manageFavorites={this.manageFavorites}
          />

          <ClassCreateDogForm
            isLoading={this.state.isLoading}
            activeComponents={this.state.activeComponent}
            postDog={this.postDog}
          />
        </ClassSection>
      </div>
    );
  }
}
