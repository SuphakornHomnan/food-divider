import React from "react";
import { Table } from "react-bootstrap";
import { Member } from "../../scripts/dto/member-dto";

interface MemberListProps {
  members: Member[];
}
const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <Table borderless bordered responsive="sm" className="my-4">
      <thead>
        <tr>
          <th>รายชื่อ</th>
          <th>จ่าย</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td style={{ background: member.color }}>{member.name}</td>
            <td>{Math.ceil(member.price)} บาท</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MemberList;
