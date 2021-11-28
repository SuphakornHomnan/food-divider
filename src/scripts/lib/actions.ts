import { CreateMember, Member } from "../dto/member-dto";
import { AddMembersToMenu, CreateMenu, Menu } from "../dto/menu-dto";
import { State } from "./types";

const getMember = (members: Member[], id: number) =>
  members.find((member) => member.id === id);

const addMembersToMenu = (state: State, input: AddMembersToMenu): State => {
  const { menuID, memberIDs } = input;
  const updatedMenuMember = state.menus.map<Menu>((menu) =>
    menu.id === menuID
      ? {
          ...menu,
          memberIDs: Array.from(new Set([...menu.memberIDs, ...memberIDs])),
        }
      : menu
  );
  const updatedMemberPrice = calculate(state);
  return {
    ...state,
    menus: updatedMenuMember,
    members: updatedMemberPrice,
  };
};

const getMenusByMemberID = (menus: Menu[], memberID: number) =>
  menus.filter((menu) => menu.memberIDs.includes(memberID));

const calculate = (state: State): Member[] => {
  const { menus, members } = state;
  const updatedPriceMember = members.map<Member>((member) => {
    const menusToBuy = getMenusByMemberID(menus, member.id);
    const priceToBuy = menusToBuy.reduce(
      (acc, cur) => acc + cur.price / cur.memberIDs.length,
      0
    );
    return {
      ...member,
      price: priceToBuy,
    };
  });

  return updatedPriceMember;
};

export const addMenu = (state: State, input: CreateMenu): State => {
  const { name, price, memberIDs } = input;
  const newMenu: Menu = {
    name,
    price,
    memberIDs,
    id: state.menus.length,
  };
  const newState: State = {
    ...state,
    menus: [...state.menus, newMenu],
  };
  const updatedMemberPrice = calculate(newState);
  return {
    ...newState,
    members: updatedMemberPrice,
  };
};

export const addMember = (state: State, input: CreateMember): State => {
  const newMember: Member = { ...input, price: 0, id: state.members.length };
  return {
    ...state,
    members: [...state.members, newMember],
  };
};
