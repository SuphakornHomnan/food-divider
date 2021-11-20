import { Food } from "../dto/food-dto";
import { Member } from "../dto/member-dto";

export class FoodDivider {
  private static instance: FoodDivider;
  private foods: Food[];
  private members: Member[];

  private constructor() {
    this.foods = [];
    this.members = [];
  }

  public static getInstance(): FoodDivider {
    if (!FoodDivider.instance) {
      FoodDivider.instance = new FoodDivider();
    }
    return FoodDivider.instance;
  }

  public createFood(name: string, price: number): void {
    this.foods.push({ name, price, memberIDs: [], id: this.foods.length });
  } //

  public createMember(name: string): void {
    this.members.push({ name, price: 0, id: this.members.length });
  } //

  public getFoods(): Food[] {
    return this.foods;
  } //

  public getMembers(): Member[] {
    return this.members;
  } //

  public getFood(foodID: number): Food | undefined {
    return this.foods.find((obj) => obj.id === foodID);
  } //

  public getMember(memberID: number): Member | undefined {
    return this.members.find((obj) => obj.id === memberID);
  } //

  public updateFoodDetailByID(
    foodID: number,
    name?: string,
    price?: number
  ): void {
    if (this.getFood(foodID)) {
      if (name) this.foods[foodID].name = name;
      if (price) this.foods[foodID].price = price;
    }
  } //

  public addMemberToFoods(foodID: number, memberID: number): void {
    const food = this.getFood(foodID);
    if (food && this.getMember(memberID)) {
      if (!food.memberIDs.find((id) => id === memberID)) {
        const targetIndex = this.foods.indexOf(
          this.foods.find((food) => food.id === foodID)!
        );
        this.foods[targetIndex].memberIDs.push(memberID);
      }
    }
  } //

  public removeMemberFromFoods(foodID: number, memberID: number): void {
    const food = this.getFood(foodID);
    if (food && this.getMember(memberID)) {
      if (food.memberIDs.find((id) => id === memberID)) {
        const targetIndex = this.foods.indexOf(
          this.foods.find((food) => food.id === foodID)!
        );

        this.foods[targetIndex].memberIDs = this.foods[
          targetIndex
        ].memberIDs.filter((memID) => memID !== memberID);
      }
    }
  } //

  public clearFood(): void {
    this.foods = [];
  } //

  public clearMember(): void {
    this.members = [];
    this.foods.map((food) => (food.memberIDs = []));
  } //

  public deleteFoodByID(foodID: number): void {
    this.foods = this.foods.filter((obj) => obj.id !== foodID);
  } //

  public deleteMemberByID(memberID: number): void {
    if (this.getMember(memberID)) {
      this.members.filter((obj) => obj.id !== memberID);
      this.foods.map((food) =>
        food.memberIDs.splice(food.memberIDs.indexOf(memberID), 1)
      );
    }
  } //

  public calculate(): Member[] {
    const priceMembers: { [key: number]: number } = {};
    this.foods.forEach((food) => {
      const pricePerMember: number = food.price / food.memberIDs.length;
      food.memberIDs.forEach((memberID) => {
        priceMembers[memberID] = pricePerMember;
      });
    });

    Object.keys(priceMembers).forEach((key) => {
      const targetIndex = this.members.indexOf(
        this.members.find((member) => member.id.toString() === key)!
      );
      this.members[targetIndex].price = priceMembers[Number.parseInt(key, 10)];
    });

    return this.members;
  } //
}
