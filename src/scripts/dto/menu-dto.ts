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

export type AddMembersToMenu = {
  menuID: number;
  memberIDs: number[];
};
