import { useStateContext } from "../../hooks/context";
import MenuCard from "./menu-card";

interface MenuListProps {
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
const MenuList: React.FC<MenuListProps> = ({ onRemove, onEdit }) => {
  const { state } = useStateContext();
  const getMemberList = (memberIDs: number[]) =>
    state.members.filter((member) => memberIDs.includes(member.id));
  return (
    <>
      {state.menus.map((menu) => (
        <MenuCard
          onEdit={onEdit}
          onRemove={onRemove}
          key={menu.id}
          menu={menu}
          members={getMemberList(menu.memberIDs)}
        />
      ))}
    </>
  );
};

export default MenuList;
