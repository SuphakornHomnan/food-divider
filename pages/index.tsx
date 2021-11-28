import type { NextPage } from "next";
import React, { useReducer, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

import { Member as MemberType } from "../src/scripts/dto/member-dto";
import AddFoodModal from "../src/components/add-food-modal";
import FoodForm from "../src/components/food-form";
import MenuList from "../src/components/menu-list";
import MemberForm from "../src/components/member-form";
import MemberList from "../src/components/member-list";
import DonateTyping from "../src/components/donate-typing";
import { useModal } from "../src/hooks/use-modal";
import { GenerateQRCode } from "../src/components/generate-qrcode-promptpay";
import { Actions } from "../src/scripts/lib/types";
import { CreateMenu } from "../src/scripts/dto/menu-dto";
import { useStateContext } from "../src/hooks/context";

enum Navs {
  foods = "foods",
  members = "members",
  donate = "donate",
}

export interface SelectMember extends MemberType {
  select: boolean;
}

const Home: NextPage = () => {
  const { state, dispatch } = useStateContext();

  const [active, setActive] = useState<Navs>(Navs.members);

  const [selectMember, setSelectMember] = useState<SelectMember[]>([]);

  const [open, close, { isOpen, message: menuName }] = useModal();

  const addFood = (price: number) => {
    const memberIDs = selectMember
      .filter((mem) => mem.select)
      .map((member) => member.id);
    const payload: CreateMenu = {
      name: menuName,
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
      <MenuList menus={state.menus} />
      <FoodForm
        hasMember={state.members.length > 0}
        onSubmit={(menuName) => {
          open(menuName);
          setSelectMember(state.members.map((m) => ({ ...m, select: false })));
        }}
      />
      <Button
        onClick={() => null}
        disabled={state.menus.length === 0}
        variant="danger"
      >
        ล้างรายการ
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

  const totalPrice = state.menus.reduce((acc, cur) => acc + cur.price, 0);
  const spendMembersCount = state.members.filter(
    (member) => member.price > 0
  ).length;

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h2>จำนวนคนจ่าย</h2>
          <h1>{spendMembersCount}</h1>
        </Col>
        <Col>
          <h2>ราคาอาหารรวม</h2>
          <h1>{totalPrice}</h1>
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
        menuName={menuName}
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
