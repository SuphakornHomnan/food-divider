import React, { useState } from "react";
import { FormControl, Modal, Button, Row, Col, Form } from "react-bootstrap";
import { SelectMember as SelectMemberType } from "../../pages";
import SelectMember from "./select-mem";

interface AddFoodModalProps {
  visible?: boolean;
  onAddFood?: (price: number) => void;
  onHideModal?: () => void;
  menuName?: string;
  onSelectMember?: (id: number, selectAll?: boolean) => void;
  selectMember?: SelectMemberType[];
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  onAddFood = () => {},
  visible = false,
  onHideModal = () => {},
  menuName,
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddFood(price as number);
    setPrice("");
  };

  return (
    <Modal
      show={visible}
      onHide={() => {
        setPrice("");
        onHideModal();
      }}
    >
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <h1>{menuName}</h1>
          <FormControl
            value={price}
            onChange={({ target }) =>
              setPrice(target.value ? checkPrice(target.value) : "")
            }
            type="number"
            placeholder="ราคา"
          />
          <h4 className="mt-4">เลือกคนจ่าย</h4>
          <div className="p-2">
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
          <Button
            onClick={() =>
              selectMember.forEach((mem) => onSelectMember(mem.id, true))
            }
            variant="primary"
          >
            เลือกทั้งหมด
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              !price ||
              isNaN(price as number) ||
              selectMember.filter((s) => s.select).length === 0
            }
            variant="success"
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
