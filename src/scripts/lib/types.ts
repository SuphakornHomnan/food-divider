import { CreateMenu, Menu } from "../dto/menu-dto";
import { CreateMember, Member } from "../dto/member-dto";

export type State = {
  counter: number;
  menus: Menu[];
  members: Member[];
};

export enum Actions {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  ADD_MENU = "ADD_MENU",
  ADD_MEMBER = "ADD_MEMBER",
}

type INCREASE = { type: Actions.INCREASE };
type DECREASE = { type: Actions.DECREASE };
type ADD_MENU = { type: Actions.ADD_MENU; payload: CreateMenu };
type ADD_MEMBER = { type: Actions.ADD_MEMBER; payload: CreateMember };

export type ActionTypes = INCREASE | DECREASE | ADD_MENU | ADD_MEMBER;
