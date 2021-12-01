import {
  AttachMoneyOutlined,
  ImportContactsOutlined,
  Money,
  MoneyOutlined,
} from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useModal } from "../src/hooks/use-modal";
import MemberBook from "../src/components/member/member-book";
import AddMenuDrawer from "../src/components/menu/add-menu-drawer";
import MenuList from "../src/components/menu/menu-list";
import { DollarSign } from "react-feather";
import { useState } from "react";
import { useStateContext } from "../src/hooks/context";
import { Actions } from "../src/scripts/lib/types";

const StyledContainer = styled(Container)({
  padding: "1rem",
});

const Index = () => {
  const { dispatch } = useStateContext();
  const [open, close, { isOpen, message: menuID }] = useModal();
  const [editMode, setEditMode] = useState(false);
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();

  return (
    <StyledContainer>
      <Typography variant="h4">หารค่าอาหาร</Typography>
      <Button
        onClick={() => openMemberBook()}
        variant="outlined"
        style={{ marginRight: 10 }}
        startIcon={<AttachMoneyOutlined />}
      >
        คนจ่าย
      </Button>
      <Button onClick={() => open()}>เพิ่มรายการ</Button>
      <MenuList
        onEdit={(id) => {
          setEditMode(true);
          open(id);
        }}
        onRemove={(menuID) =>
          dispatch({
            type: Actions.REMOVE_MENU,
            payload: { menuID },
          })
        }
      />
      <AddMenuDrawer
        editMode={editMode}
        editValue={typeof menuID === "number" ? menuID : null}
        isOpen={isOpen}
        onClose={() => {
          setEditMode(false);
          close();
        }}
      />
      <MemberBook open={memberBookOpen} onClose={closeMemberBook} />
    </StyledContainer>
  );
};

export default Index;
