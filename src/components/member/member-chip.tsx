import { CheckOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { Member } from "../../scripts/dto/member-dto";

interface MmeberChipProps {
  member: Member;
  selected?: boolean;
  onSelect?: (id: number) => void;
}
const MemberChip: React.FC<MmeberChipProps> = ({
  member,
  selected = false,
  onSelect = () => {},
}) => {
  const chipColor = member.color;

  return (
    <Chip
      clickable
      onClick={() => onSelect(member.id)}
      label={member.name}
      style={{
        color: !selected ? chipColor : "white",
        borderColor: chipColor,
        background: !selected ? "white" : chipColor,
        wordBreak: "break-word",
        marginBottom: 5,
        marginRight: 5,
      }}
      {...(selected && {
        icon: (
          <CheckOutlined style={{ color: !selected ? chipColor : "white" }} />
        ),
      })}
      variant="outlined"
    />
  );
};
export default MemberChip;
