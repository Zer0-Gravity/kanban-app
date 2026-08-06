import type { LucideIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface CustomInputType {
    icon: LucideIcon;
    name: string;
    label: string;
    placeholder: string;
}

function CustomTextArea({
    icon: Icon,
    name,
    label,
    placeholder,
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
                            <textarea
                                {...field}
                                className="custom-input h-50! py-4"
                                placeholder={placeholder}
                            />
                            <Icon
                                size={16}
                                className="absolute left-5 top-1/7 -translate-y-1/2"
                            />
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default CustomTextArea;
