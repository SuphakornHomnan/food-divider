import React, { useEffect, useMemo, useState } from "react";
import { AttachMoneyOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/system";
import queryString from "query-string";
import { useRouter } from "next/router";
import { useModal } from "../src/hooks/use-modal";
import MemberBook from "../src/components/member/member-book";
import AddMenuDrawer from "../src/components/menu/add-menu-drawer";
import MenuList from "../src/components/menu/menu-list";
import { useStateContext } from "../src/hooks/context";
import { Actions } from "../src/scripts/lib/types";
import { numberWithCommas } from "../src/scripts/lib/utils";
import PromptpayFormDrawer from "../src/components/promptpay-form";
import Input from "../src/components/common/input";
import { API_URL, SHARE_LOCAL_TOKEN } from "../src/config";

const StyledContainer = styled(Container)({
  padding: "1rem",
  height: "100vh",
});

const Index = () => {
  const router = useRouter();
  const {
    state,
    dispatch,
    promptpay: { qrPromptpay, setPromptpay },
  } = useStateContext();
  const [editMode, setEditMode] = useState(false);
  const [open, close, { isOpen, message: menuID }] = useModal();
  const [openMemberBook, closeMemberBook, { isOpen: memberBookOpen }] =
    useModal();
  const [openQR, closeQR, { isOpen: isQrFormOpen }] = useModal();
  const [openSahre, closeShare, shareContext] = useModal();

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
      dispatch({ type: Actions.CLEAR_MEMU });
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

  const [copy, setCopy] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getBill = async () => {
      const { billID } = router.query;
      try {
        const res = await fetch(`${API_URL}/bills/${billID}`);
        const data = await res.json();
        if (data) {
          dispatch({ type: Actions.SET_STATE, payload: data });
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    if (router.query.promptpay) {
      setPromptpay(router.query.promptpay as string);
    }
    if (router.query.billID) {
      getBill();
    }
  }, [dispatch, router.query, setPromptpay]);

  const buildQuery = (data: any) => {
    if (qrPromptpay) {
      Object.assign(data, { promptpay: qrPromptpay });
    }
    const query = queryString.stringify(data);
    return `${window.location.protocol}//${window.location.host}/?${query}`;
  };

  const createShareLink = async () => {
    const data = {};
    try {
      const res = await fetch(`${API_URL}/bills`, {
        method: "post",
        body: JSON.stringify(state),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { billID } = await res.json();
      Object.assign(data, {
        billID: (billID as string).toString(),
      });
      localStorage.setItem(SHARE_LOCAL_TOKEN, billID);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

    const buildUrl = buildQuery(data);
    openSahre(buildUrl);
    setCopy(false);
    setGenerated(true);
  };

  const updateLink = async () => {
    const savedBill = localStorage.getItem(SHARE_LOCAL_TOKEN)!;
    const data = {};
    try {
      const res = await fetch(`${API_URL}/bills/${savedBill}`, {
        method: "put",
        body: JSON.stringify(state),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { _id } = await res.json();
      Object.assign(data, {
        billID: (_id as string).toString(),
      });
      localStorage.setItem(SHARE_LOCAL_TOKEN, _id);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
    const buildUrl = buildQuery(data);
    openSahre(buildUrl);
    setCopy(false);
    setUpdated(true);
  };

  const copyLink = async () => {
    /* Get the text field */
    const copyText = document.getElementById("share-ref") as HTMLInputElement;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    await navigator.clipboard.writeText(copyText.value);
    const text = await navigator.clipboard.readText();
    if (text) {
      setCopy(true);
    }
  };

  return (
    <StyledContainer>
      <Dialog fullWidth open={shareContext.isOpen} onClose={closeShare}>
        <DialogContent>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            แชร์บิลนี้ให้เพื่อน
          </Typography>
          <Input disabled id="share-ref" value={shareContext.message} />
          <Button disabled={generated} onClick={createShareLink}>
            สร้างลิงก์ใหม่
          </Button>
          {shareContext.message && (
            <Button disabled={updated} onClick={updateLink} color="warning">
              อัพเดท
            </Button>
          )}
          {shareContext.message && (
            <Button disabled={copy} onClick={copyLink}>
              {!copy ? "คัดลอก" : "คัดลอกแล้ว"}
            </Button>
          )}
        </DialogContent>
      </Dialog>
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
            // disabled={state.menus.length === 0 || state.members.length === 0}
            style={{ marginBottom: 10 }}
            onClick={() => {
              const shared = localStorage.getItem(SHARE_LOCAL_TOKEN);
              const buildUrl = shared ? buildQuery({ billID: shared }) : "";
              setCopy(false)
              setGenerated(false);
              setUpdated(false);
              openSahre(buildUrl);
            }}
          >
            แชร์บิลนี้
          </Button>
          <Button
            variant="outlined"
            color={qrPromptpay ? "warning" : "primary"}
            style={{ marginBottom: 10 }}
            onClick={() => openQR()}
          >
            {qrPromptpay ? "แก้ไข" : "เพิ่ม"} QR PromptPay
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
