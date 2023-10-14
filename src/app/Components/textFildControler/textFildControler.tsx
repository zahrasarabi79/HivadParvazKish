import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
export interface ITextFildControler {
  control: Control<any>;
  setFormDataChanged: (arg: boolean) => void;
  IsReturnPathName?: boolean;
  inputError: boolean;
  inputName: string;
  helperText: string | undefined;
  label: string;
  required?: boolean;
  requiredRule?: string;
}
const TextFildControler: React.FC<ITextFildControler> = ({
  requiredRule = "این فیلد الزامی است.",
  required = true,
  helperText,
  control,
  setFormDataChanged,
  IsReturnPathName = false,
  inputError,
  inputName,
  label,
}) => {
  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue={""}
      rules={{ required: requiredRule }}
      render={({ field }) => (
        <TextFildCustom
          {...field}
          onBlur={() => setFormDataChanged(true)} // Set formDataChanged to true when the input loses focus
          required={required}
          fullWidth
          disabled={IsReturnPathName}
          label={label}
          error={inputError}
          helperText={helperText}
          inputProps={{ maxLength: 40 }}
        />
      )}
    />
  );
};

export default TextFildControler;
