import { AlertCircle, type LucideIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface CustomInputType {
    icon: LucideIcon;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
}

function CustomInputField({
    icon: Icon,
    label,
    name,
    placeholder,
    type,
}: CustomInputType) {
    const { control } = useFormContext();

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-2">
                        <p className="font-semibold text-[14px]">{label}</p>

                        <div className="relative text-foreground-muted-primary">
                            <input
                                {...field}
                                type={type ? type : "text"}
                                className="bg-foreground-muted-secondary pl-15 h-11.25 w-full text-[14px] rounded-md outline-none focus-visible:ring-2"
                                placeholder={placeholder}
                                autoComplete="off"
                            />
                            <Icon
                                size={14}
                                className="absolute left-5 top-1/2 -translate-y-1/2"
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 font-medium flex gap-2 items-center">
                                <AlertCircle size={14} />
                                {error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </>
    );
}

export default CustomInputField;
