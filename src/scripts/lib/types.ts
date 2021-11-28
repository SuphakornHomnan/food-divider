import { CreateMenu, Menu } from "../dto/menu-dto";
import { CreateMember, Member } from "../dto/member-dto";

export type State = {
  menus: Menu[];
  members: Member[];
};

export enum Actions {
  ADD_MENU = "ADD_MENU",
  ADD_MEMBER = "ADD_MEMBER",
}
type ADD_MENU = { type: Actions.ADD_MENU; payload: CreateMenu };
type ADD_MEMBER = { type: Actions.ADD_MEMBER; payload: CreateMember };

export type ActionTypes = ADD_MENU | ADD_MEMBER;
