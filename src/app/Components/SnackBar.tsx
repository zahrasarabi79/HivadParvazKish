import { Snackbar } from "@mui/material";
export interface ISnackBarProps {
  vertical: "bottom" | "top";
  horizontal: "center" | "left" | "right";
  message: string;
  handleClose: () => void;
  isOpen: boolean;
}

const SnackBar: React.FC<ISnackBarProps> = ({ vertical, horizontal, message, handleClose, isOpen }) => {
  return (
    <Snackbar
      dir="rtl"
      autoHideDuration={2500}
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default SnackBar;
