import { CreateMenu } from "../dto/menu-dto";
import { State } from "./types";

export const increaseFunction = (state: State) => {
  const nextState = state.counter + 1;
  return {
    ...state,
    counter: nextState,
  };
};

export const addMenu = (state: State, input: CreateMenu): State => {
  const newMenu = { ...input, memberIDs: [], id: state.menus.length };
  return {
    ...state,
    menus: [...state.menus, newMenu],
  };
};
