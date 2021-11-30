export type Member = {
  name: string;
  id: number;
  price: number;
  color: string;
};

export type CreateMember = {
  name: string;
  color: string;
};

export type RemoveMember = {
  memberID: number;
};