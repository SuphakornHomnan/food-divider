import { CreateMember, Member, RemoveMember } from "../dto/member-dto";
import {
  AddMembersToMenu,
  CreateMenu,
  Menu,
  RemoveMemberFromMenu,
  RemoveMenu,
  UpdateMenu,
} from "../dto/menu-dto";
import { State } from "./types";

const getMenusByMemberID = (menus: Menu[], memberID: number) =>
  menus.filter((menu) => menu.memberIDs.includes(memberID));

const calculate = (state: State): Member[] => {
  const { menus, members } = state;
  const updatedPriceMember = members.map<Member>((member) => {
    const menusToPay = getMenusByMemberID(menus, member.id);
    const priceToPay = menusToPay.reduce(
      (acc, cur) => acc + cur.price / cur.memberIDs.length,
      0
    );
    return {
      ...member,
      price: priceToPay,
    };
  });

  return updatedPriceMember;
};

export const createMenu = (state: State, input: CreateMenu): State => {
  const { name, price, memberIDs } = input;
  const id =
    state.menus.length > 0 ? state.menus[state.menus.length - 1].id + 1 : 1;
  const newMenu: Menu = {
    name,
    price,
    memberIDs,
    id,
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

export const createMember = (state: State, input: CreateMember): State => {
  const id =
    state.members.length > 0
      ? state.members[state.members.length - 1].id + 1
      : 1;
  const newMember: Member = { ...input, price: 0, id };
  return {
    ...state,
    members: [...state.members, newMember],
  };
};

export const removeMember = (
  state: State,
  { memberID }: RemoveMember
): State => {
  const updatedMembers = state.members.filter(
    (member) => member.id !== memberID
  );
  const updatedMenus = state.menus.map<Menu>((menu) => {
    return {
      ...menu,
      memberIDs: menu.memberIDs.filter((id: number) => id !== memberID),
    };
  });
  const newState: State = {
    ...state,
    members: updatedMembers,
    menus: updatedMenus,
  };
  const updatedMemberPrice: Member[] = calculate(newState);

  return {
    ...newState,
    members: updatedMemberPrice,
  };
};

export const removeMenu = (state: State, { menuID }: RemoveMenu): State => {
  const updatedMenus = state.menus.filter((menu: Menu) => menu.id !== menuID);
  const newState: State = {
    ...state,
    menus: updatedMenus,
  };
  const updatedMemberPrice: Member[] = calculate(newState);
  return {
    ...newState,
    members: updatedMemberPrice,
  };
};

export const updateMenu = (
  state: State,
  { menuID, name, price, memberIDs }: UpdateMenu
): State => {
  if (!name && !price) {
    return state;
  }
  const { members, menus }: State = state;
  const targetIndex = state.menus.findIndex(menu => menu.id === menuID)
  if (name) {
    menus[targetIndex].name = name;
  }
  if (price) {
    menus[targetIndex].price = price;
  }

  if (memberIDs) {
    menus[targetIndex].memberIDs = memberIDs;
  }

  const updatedMemberPrice: Member[] = calculate({
    members,
    menus,
  });
  return {
    menus,
    members: updatedMemberPrice,
  };
};

export const addMembersToMenu = (
  state: State,
  { menuID, memberIDs }: AddMembersToMenu
): State => {
  const { members, menus }: State = state;
  const targetIndex = state.menus.findIndex(menu => menu.id === menuID)

  memberIDs.forEach((memberID: number) => {
    if (!menus[targetIndex].memberIDs.includes(memberID)) {
      menus[targetIndex].memberIDs.push(memberID);
    }
  });

  const updatedMemberPrice: Member[] = calculate({
    members,
    menus,
  });

  return {
    menus,
    members: updatedMemberPrice,
  };
};

export const removeMemberFromMenu = (
  state: State,
  { menuID, memberID }: RemoveMemberFromMenu
): State => {
  const { members, menus }: State = state;
  const targetIndex = state.menus.findIndex(menu => menu.id === menuID)
  
  menus[targetIndex].memberIDs = menus[targetIndex].memberIDs.filter(
    (member) => member !== memberID
  );
  const updatedMemberPrice: Member[] = calculate({
    members,
    menus,
  });
  return {
    menus,
    members: updatedMemberPrice,
  };
};
