import React, { useState } from "react";
import { Col, Button, FormControl, Row, Form } from "react-bootstrap";

interface FoodFormProps {
  onSubmit?: (value: string) => void;
}
const FoodForm: React.FC<FoodFormProps> = ({ onSubmit = () => null }) => {
  const [value, setValue] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
      }}
    >
      <Row className="my-3">
        <Col xs={9}>
          <FormControl
            value={value}
            onChange={(e) => setValue(e.target.value as string)}
            placeholder="เพิ่มรายการอาหาร"
          />
        </Col>
        <Col>
          <Button disabled={!value} type="submit">เพิ่ม</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FoodForm;
