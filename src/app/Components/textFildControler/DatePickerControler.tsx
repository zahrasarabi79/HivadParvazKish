import React, { useMemo, useState } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
export interface ITextFildControler {
  control: Control<any>;
  IsReturnPathName?: boolean;
  inputErrors: boolean;
  inputName: string;
  label: string;
  requiredRule?: string;
  helperText: string | undefined;
}

const DatePickerControler: React.FC<ITextFildControler> = ({ control, inputErrors, helperText, inputName, label, requiredRule = "این فیلد الزامی است.", IsReturnPathName = false }) => {
  const [DatePickerError, setDatePickerError] = useState<DateValidationError | null>(null);

  const datePickerErrorMessage = useMemo(() => {
    switch (DatePickerError) {
      case "minDate": {
        return "تاریخ واردشده معتبر نمی باشد";
      }
      case "maxDate": {
        return "تاریخ واردشده معتبر نمی باشد";
      }

      default: {
        return " ";
      }
    }
  }, [DatePickerError]);
  return (
    <Controller
      name={inputName}
      control={control}
      rules={{
        required: requiredRule,
        validate: (value) => {
          if (DatePickerError) {
            return false;
          } else {
            return true;
          }
        },
      }}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="yyyy-MM-dd"
          onError={(newError) => {
            setDatePickerError(newError);
          }}
          formatDensity="dense"
          disabled={IsReturnPathName}
          minDate={new Date("1971-01-01")}
          maxDate={new Date("2121-01-01")}
          sx={{ width: "100%" }}
          label={label}
          value={field.value || null} // when we fetch data an set default value it is correct to set value to show data as default value
          onChange={(date) => {
            field.onChange(date); // Update the field value
          }}
          slotProps={{
            textField: {
              error: datePickerErrorMessage !== " " || inputErrors,
              helperText: helperText || datePickerErrorMessage,
            },
          }}
        />
      )}
    />
  );
};

export default DatePickerControler;
