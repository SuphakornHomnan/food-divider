import React, { useState } from "react";
import { Col, Button, FormControl, Row, Form, Alert } from "react-bootstrap";

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
      {!hasMember && <Alert variant="danger">*กรุณาเพิ่มคนจ่ายก่อน</Alert>}
    </>
  );
};

export default FoodForm;
