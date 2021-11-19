import type { NextPage } from "next";
import React, { useState } from "react";
import { Modal, Button, FormControl, Card } from "react-bootstrap";
import { useModal } from "../src/hook/use-modal";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [visible, open, close] = useModal(false);
  const [data, setData] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const addInput = () => {
    setList([...list, data]);
    setData("");
  };

  return (
    <div>
      <button type="submit" onClick={open}>
        Name
      </button>
      <Modal show={visible} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Members</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 10 }}>
          name
          <div>
            {list.map((each, index) => {
              return (
                <Card style={{ marginBottom: 10 }} body key={index}>
                  {each} <Button variant='danger'>X</Button>
                </Card>
              );
            })}
            <FormControl
              style={{ marginBottom: 10 }}
              placeholder="กรอกชื่อ"
              value={data}
              onChange={(e) => setData(e.target.value as string)}
            />
            <Button onClick={addInput}>+</Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={close}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
