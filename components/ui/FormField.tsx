"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import Input, { type InputProps } from "./Input";

interface FormFieldProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label?: string;
    hint?: string;
    inputProps?: Omit<InputProps, "value" | "onChange" | "name" | "label" | "hint" | "error">;
}

export default function FormField<T extends FieldValues>({
    control,
    name,
    label,
    hint,
    inputProps,
}: FormFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Input
                    {...inputProps}
                    {...field}
                    label={label}
                    hint={hint}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
}
