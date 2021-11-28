import { CreateMenu } from "../dto/food-dto";
import { State } from "./types";

export const increaseFunction = (state: State) => {
  const nextState = state.counter + 1;
  return {
    ...state,
    counter: nextState,
  };
};

export const addMenu = (state: State, input: CreateMenu) => {
  const food = { ...input, memberIDs: [], id: state.foods.length };
  return {
    ...state,
    food: [...state.foods, food],
  };
};
