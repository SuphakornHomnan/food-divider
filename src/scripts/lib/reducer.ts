import { Reducer } from "react";
import {
  addMembersToMenu,
  createMember,
  createMenu,
  removeMember,
  removeMemberFromMenu,
  removeMenu,
  updateMenu,
} from "./actions";
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
    case Actions.SET_STATE:
      return action.payload;
    case Actions.SET_MEMBER:
      return {
        ...state,
        members: action.payload,
      };
    case Actions.SET_MENU:
      return {
        ...state,
        menus: action.payload,
      };
    case Actions.CLEAR_MEMU:
      return {
        ...state,
        menus: [],
        members: state.members.map((member) => ({ ...member, price: 0 })),
      };
    case Actions.CLEAR_MEMBER:
      return {
        ...state,
        members: [],
        menus: state.menus.map((menu) => ({ ...menu, memberIDs: [] })),
      };
    default:
      throw new Error();
  }
};

export default reducer;
