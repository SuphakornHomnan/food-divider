import { Menu } from "../dto/food-dto";
import { Member } from "../dto/member-dto";

export type State = {
  counter: number;
  foods: Array<Menu>;
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
