import { useState } from "react";
import { Menu } from "../scripts/dto/food-dto";
import { Member } from "../scripts/dto/member-dto";
import { FoodDivider } from "../scripts/lib/food-divider";

const FoodDividerStore = FoodDivider.getInstance();

export function useFoodStore() {
  const [foods, setFoods] = useState<Menu[]>([...FoodDividerStore.getFoods()]);
  const [members, setMembers] = useState<Member[]>([
    ...FoodDividerStore.getMembers(),
  ]);

  const updateFoods = () => setFoods([...FoodDividerStore.getFoods()]);
  const updateMembers = () => setMembers([...FoodDividerStore.getMembers()]);

  const addFoods = (name: string, price: number): Menu => {
    const created = FoodDividerStore.createFood(name, price);
    updateFoods();
    return created;
  };

  const createMember = (name: string, color: string) => {
    FoodDividerStore.createMember(name, color);
    updateMembers();
  };

  const addMemberToFood = (foodID: number, memberID: number) => {
    FoodDividerStore.addMemberToFoods(foodID, memberID);
    updateFoods();
  };

  const removeMemberFromFoods = (foodID: number, memberID: number) => {
    FoodDividerStore.removeMemberFromFoods(foodID, memberID);
    updateFoods();
  };

  const getMemberList = (memberIDs: number[]) =>
    FoodDividerStore.getMemberList(memberIDs);

  const calculate = () => {
    FoodDividerStore.calculate();
    updateFoods();
    updateMembers();
  };

  const clearFood = () => {
    FoodDividerStore.clearFood();
    updateFoods();
    updateMembers();
  };

  const debug = () => {
    console.log("hooks food ->", foods);
    console.log("class food ->", FoodDividerStore.getFoods());
    console.log("hooks mem ->", members);
    console.log("class mem ->", FoodDividerStore.getMembers());
  };

  return {
    foods,
    addFoods,
    createMember,
    members,
    addMemberToFood,
    removeMemberFromFoods,
    getMemberList,
    calculate,
    clearFood,
    debug,
  };
}
