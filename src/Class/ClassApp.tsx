import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ActiveComponent, Dog } from "../types";

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

  getAllDogs = () =>
    fetch("http://Localhost:3000/dogs").then((response) => response.json());

  componentDidMount() {
    this.getAllDogs().then((dogs) => {
      this.setState({ dogs: dogs });
    });
  }

  setAllDogs = (allDogs: Dog[]) => {
    this.setState({ dogs: allDogs });
  };

  setIsLoading = (loadState: boolean) => {
    loadState
      ? this.setState({ isLoading: false })
      : this.setState({ isLoading: true });
  };

  setActiveTab = (tabtype: ActiveComponent) => {
    this.setState({ activeComponent: tabtype });
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
            this.setActiveTab(tab);
          }}
        >
          {/* should be inside of the ClassSection component using react children */}

          <ClassDogs
            dogs={filteredDogs}
            isLoading={this.state.isLoading}
            activeComponents={this.state.activeComponent}
            setIsLoading={(isLoading) => {
              this.setIsLoading(isLoading);
            }}
            setAllDogs={(dogs: Dog[]) => {
              this.setAllDogs(dogs);
            }}
          />

          <ClassCreateDogForm
            activeComponents={this.state.activeComponent}
            isLoading={this.state.isLoading}
            setAllTheDogs={(allDogs: Dog[]) => {
              this.setAllDogs(allDogs);
            }}
          />
        </ClassSection>
      </div>
    );
  }
}
