import type { LucideIcon } from "lucide-react";
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
                render={({ field }) => (
                    <div className="space-y-3">
                        <p className="font-semibold">{label}</p>

                        <div className="relative text-foreground-muted-primary">
                            <input
                                {...field}
                                type={type ? type : "text"}
                                className="bg-foreground-muted-secondary pl-15 py-4 pr-5 w-full rounded-xl outline-none"
                                placeholder={placeholder}
                            />
                            <Icon
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default CustomInputField;
