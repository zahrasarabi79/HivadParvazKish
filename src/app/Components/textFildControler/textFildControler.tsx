import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
export interface ITextFildControler {
  control: Control<any>;
  IsReturnPathName?: boolean;
  inputError: boolean;
  inputName: string;
  helperText: string | undefined;
  label: string;
  required?: boolean;
  requiredRule?: string;
  key?: any;
}
const TextFildControler: React.FC<ITextFildControler> = ({ requiredRule = "این فیلد الزامی است.", required = true, helperText, control, IsReturnPathName = false, inputError, inputName, label }) => {
  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue={""}
      rules={{ required: requiredRule }}
      render={({ field }) => <TextFildCustom {...field} required={required} fullWidth disabled={IsReturnPathName} label={label} error={inputError} helperText={helperText} />}
    />
  );
};

export default TextFildControler;
