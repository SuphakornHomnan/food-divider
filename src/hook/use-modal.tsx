import { useState } from "react";

export function useModal(
  intialState: boolean = false
): [boolean, () => void, () => void] {
  const [visible, setVisible] = useState(intialState);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return [visible, openModal, closeModal];
}
