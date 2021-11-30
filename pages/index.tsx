import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  padding: "1rem",
});

const Index = () => {
  return (
    <StyledContainer>
      <Typography variant="h4">หารค่าอาหาร</Typography>
      <br />
      <div>
        <IconButton>
          <EditOutlined />
        </IconButton>
        <Card>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography>ผัดกะเพรา</Typography>
              <Typography>ราคา: 100 บาท</Typography>
            </div>
            <div>
              <Typography>คนที่ร่วมรายการ</Typography>
            </div>
          </Box>
        </Card>
      </div>
      <Button>เพิ่มเมนู</Button>
    </StyledContainer>
  );
};

export default Index;
