import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export interface INumericFormatControlerProps {
  control: Control<any>;
  setFormDataChanged: (arg: boolean) => void;
  IsReturnPathName?: boolean;
  inputError: boolean;
  inputName: string;
  label: string;
  helperText: string | undefined;
  requiredRule?: string;
  required?: boolean;
}
const NumericFormatControler: React.FC<INumericFormatControlerProps> = ({
  requiredRule = "این فیلد الزامی است.",
  control,
  setFormDataChanged,
  IsReturnPathName = false,
  inputError,
  helperText,
  required = true,
  inputName,
  label,
}) => {
  return (
    <Controller
      name={inputName}
      control={control}
      rules={{
        required: requiredRule,
      }}
      render={({ field }) => (
        <NumericFormat
          value={field.value}
          onValueChange={(v) => {
            field.onChange(v.value);
          }}
          onBlur={() => setFormDataChanged(true)}
          customInput={TextField}
          thousandSeparator
          disabled={IsReturnPathName}
          required={required}
          fullWidth
          label={label}
          error={inputError}
          helperText={helperText}
          inputProps={{ maxLength: 40 }}
        />
      )}
    />
  );
};

export default NumericFormatControler;

//*we use Numeric Format librarry for seprated number instead of textFild in render of controler
//* we can not use js function like Number.prototype.toLocaleString()
// <TextFildCustom
//   {...field}
//   disabled={IsReturnPathName}
//   required
//   fullWidth
//   type="number"
//   label={"قیمت کل"}
//   error={!!errors.reports?.[reportIndex]?.totalCost}
//   helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
// />
