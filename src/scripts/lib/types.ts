import { Menu } from "../dto/menu-dto";
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
}

type INCREASE = { type: Actions.INCREASE };
type DECREASE = { type: Actions.DECREASE };
type SET = { type: Actions.SET; payload: number };

export type ActionTypes = INCREASE | DECREASE | SET;
