export type Menu = {
  name: string;
  price: number;
  memberIDs: number[];
  id: number;
};

export type CreateMenu = {
  name: string;
  price: number;
  memberIDs: number[];
};

export type UpdateMenu = {
  menuID: number;
  name?: string;
  price?: number;
  memberIDs?: number[];
};

export type AddMembersToMenu = {
  menuID: number;
  memberIDs: number[];
};

export type RemoveMemberFromMenu = {
  menuID: number;
  memberID: number;
};

export type RemoveMenu = {
  menuID: number;
};
