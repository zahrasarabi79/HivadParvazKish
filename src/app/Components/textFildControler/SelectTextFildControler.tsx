import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
export interface ITextFildControler {
  control: Control<any>;

  IsReturnPathName: boolean;
  inputError: boolean;
  inputName: string;
  label: string;
  children: React.ReactNode;
  helperText: string | undefined;
}
const SelectTextFildControler: React.FC<ITextFildControler> = ({ control, IsReturnPathName, inputError, helperText, inputName, label, children }) => {
  return (
    <Controller
      name={`${inputName}`}
      control={control}
      defaultValue={""}
      rules={{ required: "این فیلد الزامی است." }}
      render={({ field }) => (
        <TextFildCustom {...field} required fullWidth select disabled={IsReturnPathName} label={label} error={inputError} helperText={helperText}>
          {children}
        </TextFildCustom>
      )}
    />
  );
};

export default SelectTextFildControler;
