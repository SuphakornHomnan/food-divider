import { PersonOutlined } from "@mui/icons-material";
import { Card, Icon, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ToolBox from "../common/tool-box";
import Input from "../common/Input";
import { useStateContext } from "../../hooks/context";
import { CreateMember, Member } from "../../scripts/dto/member-dto";
import React, { useState } from "react";
import { Actions } from "../../scripts/lib/types";
import { randomColor } from "../../scripts/lib/random-color";

interface MemberCardProps {
  member: Member;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onEdit = () => {},
  onRemove = () => {},
}) => (
  <Card style={{ marginBottom: "1rem", background: member.color }}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex">
        <Icon style={{ color: "#fff", marginRight: 10 }}>
          <PersonOutlined />
        </Icon>
        <Typography marginRight="10px">{member.name}</Typography>
        <Typography>คนละ {member.price} บาท</Typography>
      </Box>
      <ToolBox
        onEdit={() => onEdit(member.id)}
        onRemove={() => onRemove(member.id)}
      />
    </Box>
  </Card>
);

const MemberBook: React.FC<{ open?: boolean; onClose?: () => void }> = ({
  open = false,
  onClose = () => {},
}) => {
  const { state, dispatch } = useStateContext();
  const [name, setName] = useState("");
  const [randomedColor, setRandomColor] = useState<string[]>([
    ...state.members.map((member) => member.color),
  ]);
  const onAddNewMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return alert("กรุณากรอกชื่อ");
    }
    let newColor = randomColor();
    while (randomedColor.includes(newColor)) {
      newColor = randomColor();
    }
    setRandomColor([...randomedColor, newColor]);
    const newMember: CreateMember = {
      name,
      color: newColor,
    };
    dispatch({ type: Actions.ADD_MEMBER, payload: newMember });
    setName("");
  };
  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={() => null}
      open={open}
      anchor="bottom"
      style={{ maxHeight: 200 }}
    >
      <Box padding="1rem 0">
        <Typography padding="0 1rem" marginBottom="0 1rem">
          สมุดรายชื่อ
        </Typography>
        <Box height={500} padding="1rem" marginBottom="1rem" overflow="auto">
          {state.members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </Box>
        <form style={{ padding: "0 1rem" }} onSubmit={onAddNewMember}>
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
