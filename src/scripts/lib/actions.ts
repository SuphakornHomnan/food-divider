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

const getMember = (members: Member[], id: number) =>
  members.find((member) => member.id === id);

// const addMembersToMenu = (state: State, input: AddMembersToMenu): State => {
//   const { menuID, memberIDs } = input;
//   const updatedMenuMember = state.menus.map<Menu>((menu) =>
//     menu.id === menuID
//       ? {
//           ...menu,
//           memberIDs: Array.from(new Set([...menu.memberIDs, ...memberIDs])),
//         }
//       : menu
//   );
//   const updatedMemberPrice = calculate(state);
//   return {
//     ...state,
//     menus: updatedMenuMember,
//     members: updatedMemberPrice,
//   };
// };

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

export const createMember = (state: State, input: CreateMember): State => {
  const newMember: Member = { ...input, price: 0, id: state.members.length };
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
  { menuID, name, price,memberIDs }: UpdateMenu
): State => {
  if (!name && !price) {
    return state;
  }
  const { members, menus }: State = state;
  if (name) {
    menus[menuID].name = name;
  }
  if (price) {
    menus[menuID].price = price;
  }

  if(memberIDs) {
    menus[menuID].memberIDs = memberIDs
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
  memberIDs.map((memberID: number) => {
    if (!menus[menuID].memberIDs.includes(memberID)) {
      menus[menuID].memberIDs.push(memberID);
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
  menus[menuID].memberIDs = menus[menuID].memberIDs.filter(
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
