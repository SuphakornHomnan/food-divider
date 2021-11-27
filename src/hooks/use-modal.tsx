import React from "react";

type ModalCustomHookFunction = (
  initialState?: boolean
) => [
  (message?: any) => void,
  () => void,
  { isOpen: boolean; message: string }
];

export const useModal: ModalCustomHookFunction = (
  initialState: boolean = false
) => {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(initialState);
  const handleOpen = (message?: any) => {
    setMessage(message || "");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  return [handleOpen, handleClose, { isOpen: open, message }];
};
