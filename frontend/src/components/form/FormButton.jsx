import { Button } from "@mui/material";

function FormButton({
  variant = "contained",
  component = "button",
  size = "medium",
  color = "primary",
  onClick,
  disable = false,
  node,
  styles = {},
}) {
  return (
    <Button
      Width="100%"
      variant={variant}
      component={component}
      size={size}
      color={color}
      onClick={onClick}
      disable={disable}
      fullWidth
      sx={{ py: 1, ...styles }}
    >
      {node}
    </Button>
  );
}

export default FormButton;
