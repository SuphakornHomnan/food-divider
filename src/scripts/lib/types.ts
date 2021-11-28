import { CreateMenu, Menu } from "../dto/menu-dto";
import { Member } from "../dto/member-dto";

export type State = {
  counter: number;
  menus: Array<Menu>;
  members: Array<Member>;
};

export enum Actions {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET = "SET",
  ADD_MENU = "ADD_MENU",
}

type INCREASE = { type: Actions.INCREASE };
type DECREASE = { type: Actions.DECREASE };
type SET = { type: Actions.SET; payload: number };
type ADD_MENU = { type: Actions.ADD_MENU; payload: CreateMenu };

export type ActionTypes = INCREASE | DECREASE | SET | ADD_MENU;
