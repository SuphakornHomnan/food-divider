import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Member } from "../../scripts/dto/member-dto";
import ToolBox from "../common/tool-box";
import MemberChip from "../member/member-chip";

const CardOuterContainer = styled(Box)({
  position: "relative",
  marginBottom: "1.5rem",
});

interface MenuCardProps {
  menuName: string;
  price: number;
  members: Member[];
}
const MenuCard: React.FC = () => {
  return (
    <CardOuterContainer>
      <ToolBox absolute onRemove={() => null} onEdit={() => null} />
      <Card>
        <Box display="flex" justifyContent="space-between">
          <div style={{ width: "50%" }}>
            <Typography>ผัดกะเพรา</Typography>
            <Typography>ราคา: 100 บาท</Typography>
          </div>
          <div style={{ width: "50%" }}>
            <Typography>คนที่ร่วมรายการ</Typography>
            <Box display="flex" flexWrap="wrap" flexShrink={10}>
              <MemberChip
                member={{ color: "red", name: "job", id: 2, price: 100 }}
              />
            </Box>
          </div>
        </Box>
      </Card>
    </CardOuterContainer>
  );
};

export default MenuCard;
