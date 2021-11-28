import { Reducer } from "react";
import { increaseFunction } from "./actions";
import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  counter: 0,
  foods: [],
  members: [],
};

const reducer: Reducer<State, ActionTypes> = (state, action) => {
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
