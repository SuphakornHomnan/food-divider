import { AttachMoneyOutlined } from "@mui/icons-material";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useModal } from "../src/hooks/use-modal";
import MemberBook from "../src/components/member/member-book";
import AddMenuDrawer from "../src/components/menu/add-menu-drawer";
import MenuList from "../src/components/menu/menu-list";
import { useState } from "react";
import { useStateContext } from "../src/hooks/context";
import { Actions } from "../src/scripts/lib/types";
import { numberWithCommas } from "../src/scripts/lib/utils";

const StyledContainer = styled(Container)({
  padding: "1rem",
});

const Index = () => {
  const { state, dispatch } = useStateContext();
  const [open, close, { isOpen, message: menuID }] = useModal();
  const [editMode, setEditMode] = useState(false);
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();

  const totalPrice = state.menus.reduce((acc, cur) => acc + cur.price, 0);
  const totalPayPersons = state.members.filter(
    (member) => member.price > 0
  ).length;

  return (
    <StyledContainer>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography variant="h4">หารค่าอาหาร</Typography>
        <Grid container marginBottom={1}>
          <Grid item xs={5}>
            <Typography variant="h5">ทั้งหมด</Typography>
            <Typography variant="h5">
              {numberWithCommas(totalPrice)} บาท
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">จำนวนคน</Typography>
            <Typography variant="h5">
              {numberWithCommas(totalPayPersons)}
            </Typography>
          </Grid>
        </Grid>

        <Button style={{ marginBottom: 10 }} onClick={() => open()}>
          เพิ่มรายการ
        </Button>
        <Button
          onClick={() => openMemberBook()}
          style={{ marginBottom: 10 }}
          variant="outlined"
          startIcon={<AttachMoneyOutlined />}
        >
          คนจ่าย
        </Button>

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
      </Box>
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
