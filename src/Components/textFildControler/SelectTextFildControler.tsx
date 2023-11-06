import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { TextFildCustom } from "./TextFiledCustom";
import { IContract } from "@/Interface/Interfaces";
export interface ITextFildControler {
  control: Control<any>;
  IsReturnPathName?: boolean;
  inputError: boolean;
  inputName: string;
  label: string;
  children: React.ReactNode;
  helperText: string | undefined;
  defaultValue?: string;
}
const SelectTextFildControler: React.FC<ITextFildControler> = ({ defaultValue = "", control, IsReturnPathName = false, inputError, helperText, inputName, label, children }) => {
  return (
    <Controller
      name={`${inputName}`}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: "این فیلد الزامی است." }}
      render={({ field }) => {
        // const fieldWithoutRef = { ...field, ref: undefined };

        return (
          <TextFildCustom
            // {...fieldWithoutRef}
            // key={field.name}
            // id={field.name}
            // inputRef={field.ref}
            {...field}
            required
            fullWidth
            select
            disabled={IsReturnPathName}
            label={label}
            error={inputError}
            helperText={helperText}
          >
            {children}
          </TextFildCustom>
        );
      }}
    />
  );
};

export default SelectTextFildControler;
