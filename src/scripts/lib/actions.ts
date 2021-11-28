import { State } from "./types";

export const increaseFunction = (state: State) => {
  const nextState = state.counter + 1;
  return {
    ...state,
    counter: nextState,
  };
};
