import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export interface INumericFormatControlerProps {
  control: Control<any>;
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

  IsReturnPathName = false,
  inputError,
  helperText,
  required = true,
  inputName,
  label,
}) => {
  const conv2EnNum = (s: string | null) => {
    return s?.replace(/[۰-۹]/g, (d: string) => {
      return "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString();
    });
  };

  return (
    <Controller
      name={inputName}
      control={control}
      rules={{
        required: requiredRule,
      }}
      render={({ field }) => (
        <NumericFormat
          {...field}
          onInput={(val: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(conv2EnNum(val.target.value));
          }}
          autoComplete="off"
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
