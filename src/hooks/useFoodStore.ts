import { useMemo, useState } from "react";
import { Food } from "../../scripts/dto/food-dto";
import { Member } from "../../scripts/dto/member-dto";
import { FoodDivider } from "../../scripts/lib/food-divider";

const FoodDividerStore = FoodDivider.getInstance();
export function useFoodStore() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const addFoods = (name: string, price: number) => {
    FoodDividerStore.createFood(name, price);
    setFoods([...FoodDividerStore.getFoods()]);
  };

  const createMember = (name: string) => {
    FoodDividerStore.createMember(name);
    setMembers([...FoodDividerStore.getMembers()]);
  };

  return {
    foods,
    addFoods,
    createMember,
    members,
  };
}
