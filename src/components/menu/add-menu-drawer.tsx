import { Button, SwipeableDrawer, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../hooks/context";
import { Member } from "../../scripts/dto/member-dto";
import { CreateMenu } from "../../scripts/dto/menu-dto";
import { Actions } from "../../scripts/lib/types";
import Input from "../common/input";
import MemberChip from "../member/member-chip";

interface SelectMember extends Member {
  selected: boolean;
}
interface AddMenuDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  editMode?: boolean;
  editValue: number | null;
}

const AddMenuDrawer: React.FC<AddMenuDrawerProps> = ({
  isOpen = false,
  onClose = () => {},
  editMode = false,
  editValue,
}) => {
  const { state, dispatch } = useStateContext();
  const [menu, setMenu] = useState<string>("");
  const [price, setPrice] = useState<string | number>("");
  const [selected, setSelected] = useState<SelectMember[]>([]);

  const clearValue = () => {
    setMenu("");
    setPrice("");
  };

  const onSubmit = () => {
    const newMenu: CreateMenu = {
      name: menu.trim(),
      price: Number.parseFloat(price as string),
      memberIDs: selected
        .filter((member) => member.selected)
        .map((member) => member.id),
    };
    dispatch({ type: Actions.CREATE_MENU, payload: newMenu });
    clearValue();
    onClose();
  };

  const checkPrice = (price: string) => {
    const _price: number = Number.parseFloat(price);
    if (_price > 0) {
      return _price;
    }
    return "";
  };

  const onEditSubmit = () => {
    dispatch({
      type: Actions.UPDATE_MENU,
      payload: {
        menuID: editValue!,
        name: menu,
        price: Number.parseFloat(price as string),
        memberIDs: selected
          .filter((member) => member.selected)
          .map((member) => member.id),
      },
    });
    clearValue();
    onClose();
  };

  useEffect(() => {
    if (!editMode) {
      setSelected(
        state.members.map<SelectMember>((member) => ({
          ...member,
          selected: false,
        }))
      );
    }
  }, [editMode, state]);

  useEffect(() => {
    if (editMode && editValue !== null) {
      const menu = state.menus.find((menu) => menu.id === editValue)!;
      setMenu(menu.name);
      setPrice(menu.price);
      const selectedMember = state.members.map<SelectMember>((member) =>
        menu.memberIDs.includes(member.id)
          ? { ...member, selected: true }
          : { ...member, selected: false }
      );
      setSelected(selectedMember);
    }
  }, [editMode, editValue, state]);

  return (
    <SwipeableDrawer
      onOpen={() => null}
      onClose={() => {
        clearValue();
        onClose();
      }}
      open={isOpen}
      anchor="bottom"
    >
      <Box padding="1rem">
        <Typography>เลือกคนจ่าย</Typography>
        <div>
          {selected.map((member) => (
            <MemberChip
              selected={member.selected}
              onSelect={(id) =>
                setSelected(
                  selected.map((member) =>
                    member.id === id
                      ? { ...member, selected: !member.selected }
                      : member
                  )
                )
              }
              key={member.id}
              member={member}
            />
          ))}
        </div>
        <Button
          onClick={() =>
            setSelected(
              selected.map((member) => ({ ...member, selected: true }))
            )
          }
        >
          เลือกทั้งหมด
        </Button>
        <Button
          color="error"
          onClick={() =>
            setSelected(
              selected.map((member) => ({ ...member, selected: false }))
            )
          }
        >
          ล้าง
        </Button>
        <Typography>เพิ่มรายการอาหาร</Typography>

        <Input
          name="name"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          placeholder="พิมพ์ชื่อเมนู..."
          autoComplete="off"
        />
        <br />
        <Typography>ราคา</Typography>
        <Input
          name="price"
          type="number"
          autoComplete="off"
          value={price}
          onChange={({ target }) =>
            setPrice(target.value ? checkPrice(target.value) : "")
          }
          placeholder="ราคา"
        />
        <br />
        <Button
          disabled={(editMode && editValue === null) || !menu.trim() || !price}
          onClick={editMode ? onEditSubmit : onSubmit}
          variant="outlined"
          color="warning"
        >
          บันทึก
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default AddMenuDrawer;
