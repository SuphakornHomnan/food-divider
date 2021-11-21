import React, { useState } from "react";
import { FormControl, Modal, Button } from "react-bootstrap";
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
  const [price, setPrice] = useState<number | string>(0);
  const checkPrice = (price: string) => {
    const _price: number = Number.parseFloat(price);
    if (_price > 0) {
      return _price;
    }
    return "";
  };

  return (
    <Modal
      show={visible}
      onHide={() => {
        setPrice(0);
        onHideModal();
      }}
    >
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
          <div
            className="d-flex flex-wrap"
            style={{ justifyContent: "space-between", marginBottom: 10 }}
          >
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
          disabled={
            !price ||
            isNaN(price as number) ||
            selectMember.filter((s) => s.select).length === 0
          }
          variant="primary"
          onClick={() => {
            onAddFood(price as number);
            setPrice("");
          }}
        >
          เพิ่ม
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFoodModal;
