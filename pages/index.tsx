import type { NextPage } from "next";
import React, { useState } from "react";
import { Card, Container, Nav } from "react-bootstrap";
import { Member as MemberType } from "../scripts/dto/member-dto";
import AddFoodModal from "../src/components/add-food-modal";
import FoodForm from "../src/components/food-form";
import FoodList from "../src/components/food-list";
import MemberForm from "../src/components/member-form";
import MemberList from "../src/components/member-list";
import { useModal } from "../src/hooks/use-modal";
import { useFoodStore } from "../src/hooks/useFoodStore";

enum Navs {
  foods = "foods",
  members = "members",
}

export interface SelectMember extends MemberType {
  select: boolean;
}

const Home: NextPage = () => {
  const [active, setActive] = useState<Navs>(Navs.foods);

  const {
    foods,
    addFoods,
    members,
    createMember,
    addMemberToFood,
    removeMemberFromFoods,
    calculate,
  } = useFoodStore();

  const [selectMember, setSelectMember] = useState<SelectMember[]>([]);

  const [open, close, { isOpen, message: foodName }] = useModal();

  const addFood = (price: number) => {
    const food = addFoods(foodName, price);
    selectMember
      .filter((mem) => mem.select)
      .forEach((mem) => {
        addMemberToFood(food.id, mem.id);
      });
    calculate();
    close();
  };

  const onSelectMember = (id: number) => {
    setSelectMember((prev) =>
      prev.map((m) => (m.id === id ? { ...m, select: !m.select } : m))
    );
  };

  const renderFoodTab = () => (
    <>
      <FoodList foods={foods} />
      <FoodForm
        onSubmit={(foodName) => {
          open(foodName);
          setSelectMember(members.map((m) => ({ ...m, select: false })));
        }}
      />
    </>
  );

  const renderMemberTab = () => (
    <>
      <MemberList members={members} />
      <MemberForm onSubmit={createMember} />
    </>
  );

  const totalFoodPrice = foods.reduce((acc, cur) => acc + cur.price, 0);
  const spendMem = members.filter((mem) => mem.price > 0).length;

  return (
    <Container className="p-3">
      <Card className="p-3 mb-2">
        <h2>ราคาอาหารรวม : {totalFoodPrice}</h2>
        <h2>จำนวนคน : {spendMem}</h2>
      </Card>
      <AddFoodModal
        visible={isOpen}
        onAddFood={addFood}
        onHideModal={close}
        selectMember={selectMember}
        onSelectMember={onSelectMember}
        foodName={foodName}
      />
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            onClick={() => setActive(Navs.foods)}
            active={active === Navs.foods}
          >
            รายการอาหาร
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => setActive(Navs.members)}
            active={active === Navs.members}
          >
            คนจ่าย
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {active === Navs.foods ? renderFoodTab() : renderMemberTab()}
    </Container>
  );
};

export default Home;
