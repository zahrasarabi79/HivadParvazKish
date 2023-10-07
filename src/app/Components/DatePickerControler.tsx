import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
import { DatePicker } from "@mui/x-date-pickers";
export interface ITextFildControler {
  control: Control<any>;
  setFormDataChanged: (arg: boolean) => void;
  IsReturnPathName: boolean;
  errors: FieldErrors<any>;
  inputName: string;
  label: string;
  requiredRule: string;
}
const DatePickerControler: React.FC<ITextFildControler> = ({
  control,
  setFormDataChanged,
  IsReturnPathName,
  errors,
  inputName,
  label,
  requiredRule,
}) => {
  return (
    <Controller
      name={inputName}
      control={control}
      rules={{ required: requiredRule }}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="yyyy-MM-dd"
          formatDensity="dense"
          disabled={IsReturnPathName}
          sx={{ width: "100%" }}
          label={label}
          value={field.value} // when we fetch data an set default value it is correct to set value to show data as default value
          onChange={(date) => {
            field.onChange(date); // Update the field value
            setFormDataChanged(true); // Set dateChanged to true when the date changes
          }}
          slotProps={{
            textField: {
              error: !!errors[inputName],
              helperText: errors[inputName] ? (errors[inputName] as FieldError).message : " ",
            },
          }}
        />
      )}
    />
  );
};

export default DatePickerControler;
