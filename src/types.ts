// Add your own custom types in here
export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};

export type ActiveComponent =
  | "favorited"
  | "unfavorited"
  | "created-dog-form"
  | "all-dogs";
