import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Member } from "../../scripts/dto/member-dto";
import { Menu } from "../../scripts/dto/menu-dto";
import { numberWithCommas } from "../../scripts/lib/utils";

import ToolBox from "../common/tool-box";
import MemberChip from "../member/member-chip";

const CardOuterContainer = styled(Box)({
  position: "relative",
  margin: "30px 10px"

});

interface MenuCardProps {
  menu: Menu;
  members: Member[];
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
const MenuCard: React.FC<MenuCardProps> = ({
  menu,
  members,
  onRemove = () => {},
  onEdit = () => {},
}) => {
  return (
    <CardOuterContainer>
      <ToolBox
        absolute
        onRemove={() => onRemove(menu.id)}
        onEdit={() => onEdit(menu.id)}
      />
      <Card>
        <Box display="flex" justifyContent="space-between">
          <div style={{ width: "50%" }}>
            <Typography>{menu.name}</Typography>
            <Typography>ราคา: {numberWithCommas(menu.price)} บาท</Typography>
          </div>
          <div style={{ width: "50%" }}>
            <Typography>คนที่ร่วมรายการ</Typography>
            <Box display="flex" flexWrap="wrap">
              {members.map((member) => (
                <MemberChip selected key={member.id} member={member} />
              ))}
            </Box>
          </div>
        </Box>
      </Card>
    </CardOuterContainer>
  );
};

export default MenuCard;
