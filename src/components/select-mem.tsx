import React, { useState } from "react";

interface SelectMemberProps {
  name?: string;
  select?: boolean;
  onSelect?: () => void;
}

const SelectMember: React.FC<SelectMemberProps> = ({
  name,
  select = false,
  onSelect = () => {},
}) => {
  return (
    <div
      onClick={onSelect}
      className={`rounded bg-${
        !select ? "secondary" : "success"
      } text-white p-2 px-4 mx-1 cursor-pointer`}
    >
      {name}
    </div>
  );
};

export default SelectMember;
