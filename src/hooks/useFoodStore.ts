import { useState } from "react";
import { Food } from "../../scripts/dto/food-dto";
import { Member } from "../../scripts/dto/member-dto";
import { FoodDivider } from "../../scripts/lib/food-divider";

const FoodDividerStore = FoodDivider.getInstance();
export function useFoodStore() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const updateFoods = () => setFoods([...FoodDividerStore.getFoods()]);
  const updateMembers = () => setMembers([...FoodDividerStore.getMembers()]);

  const addFoods = (name: string, price: number): Food => {
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

  return {
    foods,
    addFoods,
    createMember,
    members,
    addMemberToFood,
    removeMemberFromFoods,
    getMemberList,
    calculate,
  };
}
