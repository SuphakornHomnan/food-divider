import {
  AddMembersToMenu,
  CreateMenu,
  Menu,
  RemoveMemberFromMenu,
  RemoveMenu,
  UpdateMenu,
} from "../dto/menu-dto";
import { CreateMember, Member, RemoveMember } from "../dto/member-dto";

export type State = {
  menus: Menu[];
  members: Member[];
};

export enum Actions {
  CREATE_MENU = "CREATE_MENU",
  REMOVE_MENU = "REMOVE_MENU",
  UPDATE_MENU = "UPDATE_MENU",
  ADD_MEMBERS_TO_MENU = "ADD_MEMBERS_TO_MENU",
  REMOVE_MEMBER_FROM_MENU = "REMOVE_MEMBER_FROM_MENU",
  CREATE_MEMBER = "CREATE_MEMBER",
  REMOVE_MEMBER = "REMOVE_MEMBER",
  SET_STATE = "SET_STATE",
  SET_MEMBER = "SET_MEMBER",
}

type CREATE_MENU = { type: Actions.CREATE_MENU; payload: CreateMenu };
type REMOVE_MENU = { type: Actions.REMOVE_MENU; payload: RemoveMenu };
type UPDATE_MENU = { type: Actions.UPDATE_MENU; payload: UpdateMenu };
type ADD_MEMBERS_TO_MENU = {
  type: Actions.ADD_MEMBERS_TO_MENU;
  payload: AddMembersToMenu;
};
type REMOVE_MEMBER_FROM_MENU = {
  type: Actions.REMOVE_MEMBER_FROM_MENU;
  payload: RemoveMemberFromMenu;
};
type CREATE_MEMBER = { type: Actions.CREATE_MEMBER; payload: CreateMember };
type REMOVE_MEMBER = { type: Actions.REMOVE_MEMBER; payload: RemoveMember };
type SET_STATE = { type: Actions.SET_STATE; payload: State };
type SET_MEMBER = { type: Actions.SET_MEMBER; payload: Member[] };

export type ActionTypes =
  | CREATE_MENU
  | REMOVE_MENU
  | UPDATE_MENU
  | ADD_MEMBERS_TO_MENU
  | REMOVE_MEMBER_FROM_MENU
  | CREATE_MEMBER
  | REMOVE_MEMBER
  | SET_STATE
  | SET_MEMBER;
