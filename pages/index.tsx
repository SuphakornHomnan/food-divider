import type { NextPage } from "next";
import React, { useReducer, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

import { Member as MemberType } from "../src/scripts/dto/member-dto";
import AddFoodModal from "../src/components/add-food-modal";
import FoodForm from "../src/components/food-form";
import FoodList from "../src/components/food-list";
import MemberForm from "../src/components/member-form";
import MemberList from "../src/components/member-list";
import DonateTyping from "../src/components/donate-typing";
import { useModal } from "../src/hooks/use-modal";
import { useFoodStore } from "../src/hooks/useFoodStore";
import { GenerateQRCode } from "../src/components/generate-qrcode-promptpay";
import reducer, { initialState } from "../src/scripts/lib/reducer";
import { Actions, ActionTypes, State } from "../src/scripts/lib/types";
import { CreateMenu } from "../src/scripts/dto/menu-dto";

enum Navs {
  foods = "foods",
  members = "members",
  donate = "donate",
}

export interface SelectMember extends MemberType {
  select: boolean;
}

const Home: NextPage = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, ActionTypes>>(
    reducer,
    initialState
  );
  const [active, setActive] = useState<Navs>(Navs.members);

  const {
    foods,
    addFoods,
    members,
    createMember,
    addMemberToFood,
    removeMemberFromFoods,
    calculate,
    clearFood,
    debug,
  } = useFoodStore();

  const [selectMember, setSelectMember] = useState<SelectMember[]>([]);

  const [open, close, { isOpen, message: foodName }] = useModal();

  const addFood = (price: number) => {
    const memberIDs = selectMember
      .filter((mem) => mem.select)
      .map((member) => member.id);
    const payload: CreateMenu = {
      name: foodName,
      price,
      memberIDs,
    };
    dispatch({ type: Actions.ADD_MENU, payload });
    close();
  };

  const onSelectMember = (id: number, selectAll: boolean = false) => {
    setSelectMember((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, select: selectAll ? true : !m.select } : m
      )
    );
  };

  const renderFoodTab = () => (
    <>
      <FoodList foods={state.menus} />
      <FoodForm
        hasMember={state.members.length > 0}
        onSubmit={(foodName) => {
          open(foodName);
          setSelectMember(state.members.map((m) => ({ ...m, select: false })));
        }}
      />
      <Button
        onClick={() => dispatch({ type: Actions.INCREASE })}
        // disabled={foods.length === 0}
        variant="danger"
      >
        ล้างรายการ
      </Button>
      <Button variant="dark" onClick={debug}>
        debug
      </Button>
    </>
  );

  const renderMemberTab = () => (
    <>
      <MemberList members={state.members} />
      <MemberForm
        onSubmit={(name, color) =>
          dispatch({ type: Actions.ADD_MEMBER, payload: { name, color } })
        }
      />
    </>
  );

  const renderDonateTab = () => (
    <>
      <DonateTyping />
    </>
  );

  const totalFoodPrice = foods.reduce((acc, cur) => acc + cur.price, 0);
  const spendMem = members.filter((mem) => mem.price > 0).length;

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h2>จำนวนคน</h2>
          <h1>{state.counter}</h1>
        </Col>
        <Col>
          <h2>ราคาอาหารรวม</h2>
          <h1>{totalFoodPrice}</h1>
        </Col>
        <Col>
          <GenerateQRCode inputNumber="0987637086" />
        </Col>
      </Row>
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
            onClick={() => setActive(Navs.members)}
            active={active === Navs.members}
          >
            คนจ่าย
          </Nav.Link>
        </Nav.Item>
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
            onClick={() => setActive(Navs.donate)}
            active={active === Navs.donate}
          >
            บริจาค
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {active === Navs.foods
        ? renderFoodTab()
        : active === Navs.members
        ? renderMemberTab()
        : renderDonateTab()}
    </Container>
  );
};

export default Home;
