import React from "react";
import { Alert, Badge, Table } from "react-bootstrap";
import { useStateContext } from "../hooks/context";
import { Menu } from "../scripts/dto/menu-dto";

export const Member: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => (
  <Badge style={{ marginRight: 5, background: color, color: "#000" }} bg="">
    {name}
  </Badge>
);

interface MenuListProps {
  menus: Menu[];
}
const MenuList: React.FC<MenuListProps> = ({ menus }) => {
  const { state } = useStateContext();
  const getMemberList = (memberIDs: number[]) =>
    state.members.filter((member) => memberIDs.includes(member.id));
  return (
    <Table borderless responsive="sm" className="my-4">
      <thead>
        <tr>
          <th>รายการอาหาร</th>
          <th>ราคา</th>
          <th>คนที่ร่วมรายการ</th>
        </tr>
      </thead>
      <tbody>
        {menus.length === 0 && (
          <tr>
            <td colSpan={3}>
              <Alert style={{ width: "100%" }} variant="secondary">
                ไม่มีข้อมูล
              </Alert>
            </td>
          </tr>
        )}
        {menus.map((menu) => (
          <tr key={menu.id}>
            <td>
              <div>{menu.name}</div>
            </td>
            <td>{menu.price} บาท</td>
            <td>
              {getMemberList(menu.memberIDs).map((member) => (
                <Member
                  key={member.id}
                  name={member.name}
                  color={member.color}
                />
              ))}
              <div>คนละ : {Math.ceil(menu.price / menu.memberIDs.length)}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MenuList;
