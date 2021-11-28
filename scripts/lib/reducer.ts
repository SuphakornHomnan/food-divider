import { Reducer } from "react";

export type State = {
  counter: number;
};
export const initialState: State = {
  counter: 0,
};

export enum Actions {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET = "SET",
}

type INCREASE = { type: Actions.INCREASE };
type DECREASE = { type: Actions.DECREASE };
type SET = { type: Actions.SET; payload: number };

export type ActionType = INCREASE | DECREASE | SET;

const increaseFunction = (state: State) => {
  const nextState = state.counter + 1;
  return {
    ...state,
    counter: nextState,
  };
};

const reducer: Reducer<State, ActionType> = (state, action) => {
  switch (action.type) {
    case Actions.INCREASE:
      return increaseFunction(state);
    case Actions.DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case Actions.SET:
      return {
        ...state,
        counter: action.payload,
      };
    default:
      throw new Error();
  }
};

export default reducer;
