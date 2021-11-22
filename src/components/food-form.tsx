import React, { useState } from "react";
import { Col, Button, FormControl, Row, Form } from "react-bootstrap";

interface FoodFormProps {
  onSubmit?: (value: string) => void;
  hasMember?: boolean;
}
const FoodForm: React.FC<FoodFormProps> = ({
  onSubmit = () => null,
  hasMember = false,
}) => {
  const [value, setValue] = useState("");
  return (
    <>
      {!hasMember && <span style={{ color: "red" }}>*กรุณาเพิ่มคนจ่ายก่อน</span>}
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
            <Button disabled={!value || !hasMember} type="submit">
              เพิ่ม
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FoodForm;
