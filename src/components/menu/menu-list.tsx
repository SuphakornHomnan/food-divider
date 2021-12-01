import { Box } from "@mui/material";
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
    <Box
      style={{ height: 575, overflow: "auto", padding: "1.5rem 0" }}
      margin="1.5rem 0"
    >
      {state.menus.map((menu) => (
        <MenuCard
          onEdit={onEdit}
          onRemove={onRemove}
          key={menu.id}
          menu={menu}
          members={getMemberList(menu.memberIDs)}
        />
      ))}
    </Box>
  );
};

export default MenuList;
