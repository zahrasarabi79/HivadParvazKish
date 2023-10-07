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
  requiredRule?: string | undefined;
}
const TextFildControler: React.FC<ITextFildControler> = ({
  control,
  setFormDataChanged,
  IsReturnPathName,
  errors,
  inputName,
  label,
  requiredRule,
}) => {
  console.log(!!errors.inputName);

  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue={""}
      rules={{ required: requiredRule }}
      // rules={{ required: `${label} الزامی است.` }}
      render={({ field }) => (
        <TextFildCustom
          {...field}
          onBlur={() => setFormDataChanged(true)} // Set formDataChanged to true when the input loses focus
          required
          fullWidth
          disabled={IsReturnPathName}
          label={label}
          error={!!errors[inputName]}
          helperText={errors[inputName] ? (errors[inputName] as FieldError).message : " "}
        />
      )}
    />
  );
};

export default TextFildControler;
