import { Reducer } from "react";
import { addMember, addMenu } from "./actions";
import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  menus: [],
  members: [],
};

const reducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case Actions.ADD_MENU:
      return addMenu(state, action.payload);
    case Actions.ADD_MEMBER:
      return addMember(state, action.payload);
    default:
      throw new Error();
  }
};

export default reducer;
