import { CloseOutlined, PersonOutlined } from "@mui/icons-material";
import {
  Card,
  Icon,
  SwipeableDrawer,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ToolBox from "../common/tool-box";
import Input from "../common/input";
import { useStateContext } from "../../hooks/context";
import { CreateMember, Member } from "../../scripts/dto/member-dto";
import React, { useState } from "react";
import { Actions } from "../../scripts/lib/types";
import { randomColor } from "../../scripts/lib/random-color";
import { numberWithCommas } from "../../scripts/lib/utils";
import { GenerateQRCode } from "../generate-qrcode-promptpay";

interface MemberCardProps {
  member: Member;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
  disabledRemove?: boolean;
  disabledEdit?: boolean;
}
const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onEdit = () => {},
  onRemove = () => {},
  disabledEdit = false,
  disabledRemove = false,
}) => (
  <Card style={{ marginBottom: "1rem", background: member.color }}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex">
        <Icon style={{ color: "#fff", marginRight: 10 }}>
          <PersonOutlined />
        </Icon>
        <Typography marginRight="10px">{member.name}</Typography>
        <Typography>
          คนละ {numberWithCommas(Math.ceil(member.price))} บาท
        </Typography>
      </Box>
      <ToolBox
        onEdit={() => onEdit(member.id)}
        onRemove={() => onRemove(member.id)}
        disabledEdit={disabledEdit}
        disabledRemove={disabledRemove}
      />
    </Box>
  </Card>
);

const useStyles = makeStyles({
  drawerPaper: {
    height: "100%",
  },
});

const MemberBook: React.FC<{ open?: boolean; onClose?: () => void }> = ({
  open = false,
  onClose = () => {},
}) => {
  const classes = useStyles();
  const {
    state,
    dispatch,
    promptpay: { qrPromptpay },
  } = useStateContext();
  const [name, setName] = useState("");
  const [randomedColor, setRandomColor] = useState<string[]>([
    ...state.members.map((member) => member.color),
  ]);
  const onAddNewMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      return alert("กรุณากรอกชื่อ");
    }
    let newColor = randomColor();
    while (randomedColor.includes(newColor)) {
      newColor = randomColor();
    }
    setRandomColor([...randomedColor, newColor]);
    const newMember: CreateMember = {
      name: name.trim(),
      color: newColor,
    };
    dispatch({ type: Actions.CREATE_MEMBER, payload: newMember });
    setName("");
    setTimeout(() => {
      const srcollArea = document.querySelector(".scroll-ref");
      srcollArea?.scrollTo({
        top: srcollArea.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const onRemoveMemner = (memberID: number) =>
    dispatch({ type: Actions.REMOVE_MEMBER, payload: { memberID } });

  const onClearMember = () => {
    const r = confirm("ต้องการล้างรายชื่อทั้งหมด ?");
    if (r) {
      dispatch({ type: Actions.SET_MEMBER, payload: [] });
    }
  }
  return (
    <SwipeableDrawer
      classes={{ paper: classes.drawerPaper }}
      onClose={onClose}
      onOpen={() => null}
      open={open}
      anchor="bottom"
      swipeAreaWidth={0}
    >
      <Box
        height="100%"
        justifyContent="space-between"
        display="flex"
        flexDirection="column"
        padding="1rem 0"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="0 0.5rem"
        >
          <Typography padding="0 1rem" marginBottom="0 1rem">
            สมุดรายชื่อ
          </Typography>
          <IconButton onClick={onClose} color="error">
            <CloseOutlined />
          </IconButton>
        </Box>
        {qrPromptpay && (
          <Box padding="0 2rem" textAlign="center">
            <Typography>QR Promptpay</Typography>
            <GenerateQRCode quietZone={10} inputNumber={qrPromptpay} />
          </Box>
        )}
        <Box padding="0 1.5rem" paddingTop={2} textAlign="right">
          <Button color="error" onClick={onClearMember}>
            ล้างรายชื่อ
          </Button>
        </Box>
        <Box className="scroll-ref" flex={1} padding="1rem" overflow="auto">
          {state.members.map((member) => (
            <MemberCard
              onRemove={onRemoveMemner}
              onEdit={() => console.log(state)}
              disabledEdit
              key={member.id}
              member={member}
            />
          ))}
        </Box>
        <form
          style={{ padding: "0 1rem", marginTop: 5 }}
          onSubmit={onAddNewMember}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เพิ่มชื่อแล้วกด Enter..."
          />
        </form>
      </Box>
    </SwipeableDrawer>
  );
};

export default MemberBook;
