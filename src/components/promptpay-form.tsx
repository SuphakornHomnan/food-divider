import { SwipeableDrawer, Box, Button } from "@mui/material";
import { useStateContext } from "../hooks/context";
import Input from "./common/input";

interface PromptpayFormDrawerProps {
  onClose?: () => void;
  isOpen?: boolean;
}
const PromptpayFormDrawer: React.FC<PromptpayFormDrawerProps> = ({
  onClose = () => {},
  isOpen = false,
}) => {
  const { promptpay } = useStateContext();
  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={() => null}
      anchor="bottom"
      open={isOpen}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
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
              onClose();
            }}
          >
            ล้าง
          </Button>
        )}
      </form>
    </SwipeableDrawer>
  );
};

export default PromptpayFormDrawer
