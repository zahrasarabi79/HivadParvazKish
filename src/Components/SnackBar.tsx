import { useAppDispatch } from "@/redux/hook";
import { closeSnackbar } from "@/redux/slices/snackbarSlice";
import { Snackbar } from "@mui/material";
export interface ISnackBarProps {
  vertical: "bottom" | "top";
  horizontal: "center" | "left" | "right";
  message: string;
  isOpen: boolean;
  color: string;
}

const SnackBar: React.FC<ISnackBarProps> = ({ vertical, horizontal, message, isOpen, color }) => {
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      dir="rtl"
      autoHideDuration={2000}
      sx={{
        "& .MuiPaper-root.MuiSnackbarContent-root": {
          minWidth: 0,
          maxWidth: 300,
          backgroundColor: color,
          color: "white",
          fontSize: "14px",
          borderRadius: "12px",
        },
      }}
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      onClose={() => {
        dispatch(closeSnackbar());
      }}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default SnackBar;
