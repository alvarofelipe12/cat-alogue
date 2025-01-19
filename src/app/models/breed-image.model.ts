import { Breed } from "./breed.model";

export interface BreedImage {
  id: string;
  url: string;
  breeds?: Breed[];
  width: number;
  height: number;
}
