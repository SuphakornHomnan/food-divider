import { AttachMoneyOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  SwipeableDrawer,
} from "@mui/material";
import { styled } from "@mui/system";
import { useModal } from "../src/hooks/use-modal";
import MemberBook from "../src/components/member/member-book";
import AddMenuDrawer from "../src/components/menu/add-menu-drawer";
import MenuList from "../src/components/menu/menu-list";
import React, { useState } from "react";
import { useStateContext } from "../src/hooks/context";
import { Actions } from "../src/scripts/lib/types";
import { numberWithCommas } from "../src/scripts/lib/utils";
import Input from "../src/components/common/input";

const StyledContainer = styled(Container)({
  padding: "1rem",
});

const Index = () => {
  const { state, dispatch, promptpay } = useStateContext();
  const [open, close, { isOpen, message: menuID }] = useModal();
  const [editMode, setEditMode] = useState(false);
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();
  const [openQR, closeQR, qrContext] = useModal();

  const totalPrice = state.menus.reduce((acc, cur) => acc + cur.price, 0);
  const totalPayPersons = state.members.filter(
    (member) => member.price > 0
  ).length;

  const onEditMenu = (id: number) => {
    setEditMode(true);
    open(id);
  };
  const onRemoveMenu = (menuID: number) => {
    const r = confirm(
      `ต้องการลบ ${state.menus.find((menu) => menu.id === menuID)?.name!}`
    );
    if (r) {
      dispatch({
        type: Actions.REMOVE_MENU,
        payload: { menuID },
      });
    }
  };

  return (
    <StyledContainer>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography variant="h4">หารค่าอาหาร</Typography>
        <Grid container marginBottom={1}>
          <Grid item xs={6}>
            <Typography variant="h5">ทั้งหมด</Typography>
            <Typography variant="h5">
              {numberWithCommas(totalPrice)} บาท
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">จำนวนคน</Typography>
            <Typography variant="h5">
              {numberWithCommas(totalPayPersons)}
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Button
          variant="outlined"
          color={promptpay.qrPromptpay ? "warning" : "primary"}
          style={{ marginBottom: 10 }}
          onClick={() => openQR()}
        >
          {promptpay.qrPromptpay ? "แก้ไข" : "เพิ่ม"} QR PromptPay
        </Button>
        <Button
          onClick={() => openMemberBook()}
          style={{ marginBottom: 10 }}
          variant="outlined"
          startIcon={<AttachMoneyOutlined />}
        >
          คนจ่าย
        </Button>
        <Button style={{ marginBottom: 10 }} onClick={() => open()}>
          เพิ่มรายการ
        </Button>
        <SwipeableDrawer
          onClose={closeQR}
          onOpen={() => null}
          anchor="bottom"
          open={qrContext.isOpen}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeQR();
            }}
            style={{ padding: "1rem", display: "flex" }}
          >
            <Box flex={1}>
              <Input
                value={promptpay.qrPromptpay}
                type="number"
                autoComplete="off"
                onChange={(e) => promptpay.setPromptpay(e.target.value)}
                placeholder="กรอก promptpay"
              />
            </Box>
            {promptpay.qrPromptpay && (
              <Button
                color="error"
                onClick={() => {
                  promptpay.setPromptpay("");
                  closeQR();
                }}
              >
                ล้าง
              </Button>
            )}
          </form>
        </SwipeableDrawer>
        <MenuList onEdit={onEditMenu} onRemove={onRemoveMenu} />
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
