import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
export interface ITextFildControler {
  control: Control<any>;
  setFormDataChanged: (arg: boolean) => void;
  IsReturnPathName: boolean;
  errors: FieldErrors<any>;
  inputName: string;
  label: string;
  requiredRule: string;
  children: React.ReactNode;
}
const SelectTextFildControler: React.FC<ITextFildControler> = ({
  control,
  setFormDataChanged,
  IsReturnPathName,
  errors,
  inputName,
  label,
  requiredRule,
  children,
}) => {
  return (
    <Controller
      name={`${inputName}`}
      control={control}
      defaultValue={""}
      rules={{ required: requiredRule }}
      render={({ field }) => (
        <TextFildCustom
          {...field}
          onBlur={() => setFormDataChanged(true)} // Set formDataChanged to true when the input loses focus
          required
          fullWidth
          select
          disabled={IsReturnPathName}
          label={label}
          error={!!errors[inputName]}
          helperText={errors[inputName] ? (errors[inputName] as FieldError).message : " "}
        >
          {children}
        </TextFildCustom>
      )}
    />
  );
};

export default SelectTextFildControler;
