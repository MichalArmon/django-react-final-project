import { Button } from "@mui/material";

function FormButton({
  variant = "contained",
  component = "button",
  size = "medium",
  color = "primary",
  onClick,
  disable = false,
  node,
}) {
  return (
    <Button
      variant={variant}
      component={component}
      size={size}
      color={color}
      onClick={onClick}
      disable={disable}
      fullWidth
    >
      {node}
    </Button>
  );
}

export default FormButton;
