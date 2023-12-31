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
  requiredRule = "این فیلد الزامی است",
  control,
  IsReturnPathName = false,
  inputError,
  helperText,
  required = true,
  inputName,
  label,
}) => {
  const regex = /[0-9۰-۹]/;
  const conv2EnNum = (s: string) => {
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
        // validate: (value) => {
        //   if (required && !regex.test(value)) {
        //     return "این فیلد الزامی است";
        //   } else {
        //     return true;
        //   }
        // },
      }}
      render={({ field }) => {
        return (
          <NumericFormat
            {...field}
            dir="rtl"
            type="tel"
            value={field.value}
            onKeyDown={(val: any) => {
              let s = val.nativeEvent.key;
              let a: any = conv2EnNum(s);
              if (isNaN(s) && !isNaN(a)) {
                val.target.value += a;
              }
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
        );
      }}
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
