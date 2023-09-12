import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

export const TextFildCustom = styled(TextField)({
  input: { color: "white" },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  '& input[type="number"]': {
    MozAppearance: "textfield",
  },

  "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & textarea:-webkit-autofill, & textarea:-webkit-autofill:hover, & textarea:-webkit-autofill:focus, & select:-webkit-autofill, & select:-webkit-autofill:hover, & select:-webkit-autofill:focus":
    {
      "-webkit-text-fill-color": "white",
      "-webkit-box-shadow": "0 0 0px 1000px rgba(255, 255, 255, 0.0) inset",
      transition: "background-color 5000s ease-in-out 0s",
    },
});
