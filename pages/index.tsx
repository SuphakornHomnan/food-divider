import type { NextPage } from "next";
import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Card,
  Container,
  Row,
  Col,
  Form,
  Nav,
} from "react-bootstrap";
import FoodForm from "../src/components/food-form";
import FoodList, { Member } from "../src/components/food-list";
import { useModal } from "../src/hooks/use-modal";
import { useFoodStore } from "../src/hooks/useFoodStore";

enum Navs {
  foods = "foods",
  members = "members",
}

const Home: NextPage = () => {
  const [active, setActive] = useState<Navs>(Navs.foods);
  const [openAddMember, closeAddMember, addMemberCtx] = useModal(false);

  const { foods, addFoods, members, createMember } = useFoodStore();

  const onAddFood = () => {
    addFoods(addMemberCtx.message, 100);
  };

  const renderFoodTab = () => (
    <>
      <FoodList foods={foods} />
      <FoodForm onSubmit={(foodName) => open(foodName)} />
    </>
  );

  const renderMemberTab = () => (
    <>
    add member
    </>
  )

  return (
    <Container className="p-3">
      <Card className="p-3 mb-2">
        <h1>Summary</h1>
        <h2>ราคาอาหารรวม : </h2>
        <h2>จำนวนคน : </h2>
      </Card>

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
