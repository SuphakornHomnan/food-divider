import React from "react";
import { Badge, Table } from "react-bootstrap";
import { Food } from "../../scripts/dto/food-dto";

export const Member: React.FC<{ name: string }> = ({ name }) => (
  <Badge style={{ marginRight: 5 }} bg="primary">
    {name}
  </Badge>
);

interface FoodListProps {
  foods: Food[];
}
const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <Table borderless bordered responsive="sm" className="my-4">
      <thead>
        <th>รายการอาหาร</th>
        <th>ราคา</th>
        <th>คนที่ร่วมรายการ</th>
      </thead>
      <tbody>
        {foods.map((food) => (
          <tr key={food.id}>
            <td>
              <div>{food.name}</div>
            </td>
            <td>{food.price} บาท</td>
            <td>
              {food.memberIDs.map((member) => (
                <Member key={member} name={member.toString()} />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FoodList;
