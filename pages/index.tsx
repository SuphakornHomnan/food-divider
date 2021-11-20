import type { NextPage } from "next";
import React, { useState } from "react";
import {
  Card,
  Container,
  Modal,
  Nav,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { Member as MemberType } from "../scripts/dto/member-dto";
import FoodForm from "../src/components/food-form";
import FoodList, { Member } from "../src/components/food-list";
import MemberForm from "../src/components/member-form";
import MemberList from "../src/components/member-list";
import SelectMember from "../src/components/select-mem";
import { useModal } from "../src/hooks/use-modal";
import { useFoodStore } from "../src/hooks/useFoodStore";

enum Navs {
  foods = "foods",
  members = "members",
}

interface SelectMember extends MemberType {
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

  const [price, setPrice] = useState<number>(0);

  const [selectMember, setSelectMember] = useState<SelectMember[]>([]);

  const [open, close, { isOpen, message }] = useModal();

  const addFood = () => {
    const food = addFoods(message, price);
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

  const onHideModal = () => {
    setPrice(0);
    close();
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

  return (
    <Container className="p-3">
      <Card className="p-3 mb-2">
        <h2>ราคาอาหารรวม : </h2>
        <h2>จำนวนคน : </h2>
      </Card>

      <Modal show={isOpen} onHide={onHideModal}>
        <Modal.Body>
          <h1>{message}</h1>
          <FormControl
            value={price}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            type="number"
            placeholder="ราคา"
          />
          <div className="p-2">
            <h4>เลือกคนจ่าย</h4>
            <div className="d-flex">
              {selectMember.map((member) => (
                <SelectMember
                  key={member.id}
                  select={member.select}
                  onSelect={() => onSelectMember(member.id)}
                  name={member.name}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!price || isNaN(price) || selectMember.filter(s=>s.select).length === 0}
            variant="primary"
            onClick={addFood}
          >
            เพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>

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
