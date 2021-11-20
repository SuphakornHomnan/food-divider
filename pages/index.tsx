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
} from "react-bootstrap";
import FoodForm from "../src/components/food-form";
import FoodList, { Member } from "../src/components/food-list";
import { useModal } from "../src/hooks/use-modal";
import { useFoodStore } from "../src/hooks/useFoodStore";

const Home: NextPage = () => {
  const [{ visible, message }, open, close] = useModal(false);
  const [name, setName] = useState<string>("");

  const { foods, addFoods, members, createMember } = useFoodStore();

  const addInput = (e) => {
    e.preventDefault();
    createMember(name);
    setName("");
  };

  const onAddFood = () => {
    addFoods(message, 100);
  };
  return (
    <Container className="p-3">
      <Card className="p-3">
        <h1>Summary</h1>
        <h2>ราคาอาหารรวม : </h2>
        <h2>จำนวนคน : </h2>
      </Card>

      <FoodList foods={foods} />

      <FoodForm onSubmit={(foodName) => open(foodName)} />

      <Modal show={visible} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Members</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 10 }}>
          <div className="mb-3">
            {members.map((menber) => (
              <Member key={menber.id} name={menber.name} />
            ))}
          </div>
          <Form onSubmit={addInput}>
            <Row>
              <Col xs={9}>
                <FormControl
                  style={{ marginBottom: 10 }}
                  placeholder="กรอกชื่อ"
                  value={name}
                  onChange={(e) => setName(e.target.value as string)}
                />
              </Col>
              <Col>
                <Button disabled={!name} type="submit">
                  +
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onAddFood}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
