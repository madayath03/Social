import { Box } from "@mui/material";
import { styled } from "@mui/system";

// this is very good if we use css as components
// so we have css properties as component and use where we need
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
