import styled from "@emotion/styled";
import { Box } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem .75rem 2rem",
  borderRadius: "1rem",
  backgroundColor: theme.palette.background.alt,
  // border: "1px solid rgba(0,0,0,0.1)",
  // boxShadow: "2px 2px 20px rgba(0,0,0,0.1)",
}));

export default WidgetWrapper;
