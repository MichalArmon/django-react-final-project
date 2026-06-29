import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Form({
  title = "",
  onSubmit,
  onReset,
  to = "/",
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
}) {
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    ></Box>
  );
}

export default Form;
