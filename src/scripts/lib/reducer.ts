import { Reducer } from "react";
import { addMembersToMenu, createMember, createMenu, removeMember, removeMemberFromMenu, removeMenu, updateMenu } from "./actions";
import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  menus: [],
  members: [],
};

const reducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case Actions.CREATE_MENU:
      return createMenu(state, action.payload);
    case Actions.REMOVE_MENU:
      return removeMenu(state, action.payload);
    case Actions.UPDATE_MENU:
      return updateMenu(state, action.payload);
    case Actions.ADD_MEMBERS_TO_MENU:
      return addMembersToMenu(state, action.payload);
    case Actions.REMOVE_MEMBER_FROM_MENU:
      return removeMemberFromMenu(state, action.payload);
    case Actions.CREATE_MEMBER:
      return createMember(state, action.payload);
    case Actions.REMOVE_MEMBER:
      return removeMember(state, action.payload);
    default:
      throw new Error();
  }
};

export default reducer;
