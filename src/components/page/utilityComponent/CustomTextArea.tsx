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
                                className="bg-foreground-muted-secondary text-[14px] pl-15 py-4 pr-5 w-full h-50 resize-none rounded-xl outline-none focus-visible:ring-2 scrollbar-custom"
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
