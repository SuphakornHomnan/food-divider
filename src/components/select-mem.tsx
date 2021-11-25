import React from "react";
import { Col, Row } from "react-bootstrap";
import { Check, Plus } from "react-feather";
import { Member } from "../../scripts/dto/member-dto";

interface SelectMemberProps {
  member: Member;
  select?: boolean;
  onSelect?: () => void;
}

const SelectMember: React.FC<SelectMemberProps> = ({
  member,
  select = false,
  onSelect = () => {},
}) => {
  return (
    <Row
      xs={4}
      onClick={onSelect}
      className="rounded cursor-pointer py-2"
      style={{
        background: !select ? "#f5f5f5" : member.color,
      }}
    >
      <Col xs={1}>{select ? <Check size={12} /> : <Plus size={12} />}</Col>
      <Col xs={3}>{member.name}</Col>
    </Row>
  );
};

export default SelectMember;
