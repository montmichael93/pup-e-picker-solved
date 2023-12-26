import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";

type State = {
  allDogs: Dog[] | [];
  selectFavorite: Dog | null;
  isLoading: boolean;
  favorited: boolean;
  unfavorited: boolean;
  showNewDogForm: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    selectFavorite: null,
    isLoading: false,
    favorited: false,
    unfavorited: false,
    showNewDogForm: false,
  };

  getAllDogs = () =>
    fetch("http://Localhost:3000/dogs").then((response) => response.json());

  componentDidMount() {
    this.getAllDogs().then((dogs) => {
      this.setState({ allDogs: dogs });
    });
  }

  setAllDogs = (allDogs: Dog[]) => {
    this.setState({ allDogs: allDogs });
  };

  selectFavorite = (selectedFavorite: Dog) => {
    this.setState({ selectFavorite: selectedFavorite });
  };

  favorited = (favStatus: boolean) => {
    this.setState({ favorited: favStatus });
  };

  unfavorited = (favStatus: boolean) => {
    this.setState({ unfavorited: favStatus });
  };

  showNewDogForm = (status: boolean) => {
    this.setState({ showNewDogForm: status });
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={this.state.allDogs}
          favorited={this.state.favorited}
          unfavorited={this.state.unfavorited}
          showNewDogForm={this.state.showNewDogForm}
          setFavorited={(status) => {
            this.favorited(status);
          }}
          setUnfavorited={(status) => {
            this.unfavorited(status);
          }}
          setShowNewDogForm={(status) => {
            this.showNewDogForm(status);
          }}
        >
          {/* should be inside of the ClassSection component using react children */}
          {!this.state.showNewDogForm ? (
            <>
              <ClassDogs
                allDogs={this.state.allDogs}
                isLoading={this.state.isLoading}
                selectFavorite={this.state.selectFavorite}
                favorited={this.state.favorited}
                unfavorited={this.state.unfavorited}
                setSelectFavorite={(chosenFavorite) => {
                  this.selectFavorite(chosenFavorite);
                }}
                setFavorited={(status) => {
                  this.favorited(status);
                }}
                setUnfavorited={(status) => {
                  this.unfavorited(status);
                }}
                setNewDogForm={(status) => {
                  this.showNewDogForm(status);
                }}
              />
            </>
          ) : (
            <>
              <ClassCreateDogForm
                allDogs={this.state.allDogs}
                isLoading={this.state.isLoading}
                setAllTheDogs={(allDogs: Dog[]) => {
                  this.setAllDogs(allDogs);
                }}
              />
            </>
          )}
        </ClassSection>
      </div>
    );
  }
}
