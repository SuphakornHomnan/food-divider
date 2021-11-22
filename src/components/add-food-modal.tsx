import React, { useState } from "react";
import { FormControl, Modal, Button, Row, Col, Form } from "react-bootstrap";
import { SelectMember as SelectMemberType } from "../../pages";
import SelectMember from "./select-mem";

interface AddFoodModalProps {
  visible?: boolean;
  onAddFood?: (price: number) => void;
  onHideModal?: () => void;
  foodName?: string;
  onSelectMember?: (id: number) => void;
  selectMember?: SelectMemberType[];
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  onAddFood = () => {},
  visible = false,
  onHideModal = () => {},
  foodName,
  onSelectMember = () => {},
  selectMember = [],
}) => {
  const [price, setPrice] = useState<number | string>("");
  const checkPrice = (price: string) => {
    const _price: number = Number.parseFloat(price);
    if (_price > 0) {
      return _price;
    }
    return "";
  };

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddFood(price as number);
    setPrice("");
  };

  return (
    <Modal
      show={visible}
      onHide={() => {
        setPrice(0);
        onHideModal();
      }}
    >
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <h1>{foodName}</h1>
          <FormControl
            value={price}
            onChange={({ target }) =>
              setPrice(target.value ? checkPrice(target.value) : "")
            }
            type="number"
            placeholder="ราคา"
          />
          <div className="p-2">
            <h4>เลือกคนจ่าย</h4>
            <Row xs={3}>
              {selectMember.map((member) => (
                <Col
                  key={member.id}
                  style={{ marginBottom: 10, marginRight: 10 }}
                >
                  <SelectMember
                    select={member.select}
                    onSelect={() => onSelectMember(member.id)}
                    member={member}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              !price ||
              isNaN(price as number) ||
              selectMember.filter((s) => s.select).length === 0
            }
            variant="primary"
            type="submit"
          >
            เพิ่ม
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddFoodModal;
