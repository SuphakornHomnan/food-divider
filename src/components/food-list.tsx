import React from "react";
import { Badge, Table } from "react-bootstrap";
import { Food } from "../../scripts/dto/food-dto";
import { useFoodStore } from "../hooks/useFoodStore";

export const Member: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => (
  <Badge style={{ marginRight: 5, background: color, color: "#000" }} bg="">
    {name}
  </Badge>
);

interface FoodListProps {
  foods: Food[];
}
const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  const { getMemberList } = useFoodStore();
  return (
    <Table borderless bordered responsive="sm" className="my-4">
      <thead>
        <tr>
          <th>รายการอาหาร</th>
          <th>ราคา</th>
          <th>คนที่ร่วมรายการ</th>
        </tr>
      </thead>
      <tbody>
        {foods.length === 0 && <span style={{color:'#6d6d6d'}}>ไม่มีข้อมูล</span> }
        {foods.map((food) => (
          <tr key={food.id}>
            <td>
              <div>{food.name}</div>
            </td>
            <td>{food.price} บาท</td>
            <td>
              {getMemberList(food.memberIDs).map((member) => (
                <Member
                  key={member.id}
                  name={member.name}
                  color={member.color}
                />
              ))}
              <div>คนละ : {Math.ceil(food.price / food.memberIDs.length)}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FoodList;
