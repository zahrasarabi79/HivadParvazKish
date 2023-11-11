import React, { Ref } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { error } from "console";

export interface ITextFildControler {
  control: Control<any>;
  IsReturnPathName?: boolean;
  inputError: boolean;
  inputName: string;
  helperText: string | undefined;
  label: string;
  required?: boolean;
  requiredRule?: string | boolean;
  key?: any;
  validateValue?: any;
  length?: { maxLength: number; minLength: number };
}
const TextFildControler: React.FC<ITextFildControler> = ({
  requiredRule = "این فیلد الزامی است.",
  required = true,
  helperText,
  control,
  IsReturnPathName = false,
  inputError,
  inputName,
  validateValue,
  label,
  length,
}) => {
  return (
    <Controller
      control={control}
      name={inputName}
      defaultValue={""}
      rules={{ required: requiredRule, validate: (v) => validateValue && validateValue(v), maxLength: length && length.maxLength, minLength: length && length.minLength }}
      render={({ field }) => {
        return <TextFildCustom {...field} autoComplete="off" required={required} fullWidth disabled={IsReturnPathName} label={label} error={inputError} helperText={helperText} />;
      }}
    />
  );
};

export default TextFildControler;
