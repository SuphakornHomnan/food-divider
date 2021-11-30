import {
  ContactPageOutlined,
  ContactsOutlined,
  DeleteOutlined,
  EditOutlined,
  ImportContactsOutlined,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Typography,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuCard from "../src/components/menu/menu-card";
import { useModal } from "../src/hooks/use-modal";
import Input from "../src/components/common/Input";
import MemberChip from "../src/components/member/member-chip";
import MemberBook from "../src/components/member/member-book";

const StyledContainer = styled(Container)({
  padding: "1rem",
});

const Index = () => {
  const [open, close, { isOpen }] = useModal();
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();
  return (
    <StyledContainer>
      <Typography variant="h4">หารค่าอาหาร</Typography>
      <Button
        onClick={() => openMemberBook()}
        variant="outlined"
        startIcon={<ImportContactsOutlined />}
      >
        รายชื่อคนร่วมรายการ
      </Button>
      <Box style={{ height: 575, overflow: 'auto', padding:'1.5rem 0' }} margin="1.5rem 0">
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </Box>

      <Button onClick={() => open()}>เพิ่มเมนู</Button>
      <SwipeableDrawer
        onClose={close}
        onOpen={() => null}
        open={isOpen}
        anchor="bottom"
      >
        <Box padding="1rem">
          <Typography>เพิ่มรายการอาหาร</Typography>
          <Input placeholder="ชื่อเมนู..." />
          <br />
          <Typography>เลือกคนจ่าย</Typography>
          <div style={{ marginBottom: 10 }}>
            {new Array(20).fill(1).map((_, i) => (
              <MemberChip
                key={i}
                member={{ color: "red", name: "job", id: 2, price: 100 }}
              />
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <Button variant="outlined">เพิ่ม</Button>
          </div>
        </Box>
      </SwipeableDrawer>
      <MemberBook open={memberBookOpen} onClose={closeMemberBook} />
    </StyledContainer>
  );
};

export default Index;
