import React, { useState } from "react";
import { Col, Button, FormControl, Row, Form } from "react-bootstrap";
import { randomColor } from "../scripts/lib/random-color";

interface MemberFormProps {
  onSubmit?: (name: string, color: string) => void;
}
const MemberForm: React.FC<MemberFormProps> = ({ onSubmit = () => null }) => {
  const [name, setName] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        let color = randomColor();
        while (colors.includes(color)) {
          color = randomColor();
        }
        setColors([...colors, color]);
        onSubmit(name, color);
        setName("");
      }}
    >
      <Row className="my-3">
        <Col xs={9}>
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value as string)}
            placeholder="เพิ่มรายชื่อ"
          />
        </Col>
        <Col>
          <Button disabled={!name} type="submit">
            เพิ่ม
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MemberForm;
