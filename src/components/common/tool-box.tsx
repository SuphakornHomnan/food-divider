import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const IconContainer = styled(Box)({
  top: -20,
  right: 0,
  display: "flex",
});
const StyledIconButton = styled(IconButton)({
  background: grey[100],
  margin: "0 5px",
});

interface ToolBoxProps {
  onRemove?: () => void;
  onEdit?: () => void;
  absolute?: boolean;
  disabledRemove?: boolean;
  disabledEdit?: boolean;
}

const ToolBox: React.FC<ToolBoxProps> = ({
  onRemove,
  onEdit,
  absolute = false,
  disabledEdit = false,
  disabledRemove = false,
}) => (
  <IconContainer style={absolute ? { position: "absolute" } : undefined}>
    {!disabledEdit && (
      <StyledIconButton onClick={onEdit}>
        <EditOutlined />
      </StyledIconButton>
    )}
    {!disabledRemove && (
      <StyledIconButton color="warning" onClick={onRemove}>
        <DeleteOutlined />
      </StyledIconButton>
    )}
  </IconContainer>
);

export default ToolBox;
