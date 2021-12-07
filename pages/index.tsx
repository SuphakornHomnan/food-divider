import React, { useMemo, useState } from "react";
import { AttachMoneyOutlined } from "@mui/icons-material";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useModal } from "../src/hooks/use-modal";
import MemberBook from "../src/components/member/member-book";
import AddMenuDrawer from "../src/components/menu/add-menu-drawer";
import MenuList from "../src/components/menu/menu-list";
import { useStateContext } from "../src/hooks/context";
import { Actions } from "../src/scripts/lib/types";
import { numberWithCommas } from "../src/scripts/lib/utils";
import PromptpayFormDrawer from "../src/components/promptpay-form";

const StyledContainer = styled(Container)({
  padding: "1rem",
  height: "100vh",
});

const Index = () => {
  const { state, dispatch, promptpay } = useStateContext();
  const [editMode, setEditMode] = useState(false);
  const [open, close, { isOpen, message: menuID }] = useModal();
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();
  const [openQR, closeQR, { isOpen: isQrFormOpen }] = useModal();

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

  const onClearMenu = () => {
    const r = confirm("ต้องการล้างรายการทั้งหมด ?");
    if (r) {
      dispatch({ type: Actions.SET_MENU, payload: [] });
    }
  };

  const { totalPayPersons, totalPrice } = useMemo(() => {
    const totalPrice = state.menus.reduce((acc, cur) => acc + cur.price, 0);
    const totalPayPersons = state.members.filter(
      (member) => member.price > 0
    ).length;
    return {
      totalPrice,
      totalPayPersons,
    };
  }, [state]);

  return (
    <StyledContainer>
      <Box
        height="100%"
        justifyContent="space-between"
        display="flex"
        flexDirection="column"
        padding="1rem 0"
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">หารค่าอาหาร</Typography>
            <Button color="error" onClick={onClearMenu}>
              ล้างรายการ
            </Button>
          </Box>
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
        </Box>
        <Box display="flex" flexDirection="column">
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
            จ่ายคนละ
          </Button>
        </Box>
        <Box className="menu-scroll-ref" style={{ overflow: "auto" }} flex={1}>
          <MenuList onEdit={onEditMenu} onRemove={onRemoveMenu} />
        </Box>

        <Button style={{ marginBottom: 10 }} onClick={() => open()}>
          เพิ่มรายการ
        </Button>
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
      <PromptpayFormDrawer onClose={closeQR} isOpen={isQrFormOpen} />
    </StyledContainer>
  );
};

export default Index;
