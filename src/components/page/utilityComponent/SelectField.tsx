import { Controller, useFormContext } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { AlertCircle, PackageOpen, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Select {
    value: string;
    label: string;
}

interface SelectType {
    items: Select[];
    icon: LucideIcon;
    idName: string;
    children: ReactNode;
    label: string;
    placeholder: string;
    emptyState?: string;
}

function SelectField({
    idName,
    items,
    icon: Icon,
    children,
    label,
    placeholder,
    emptyState,
}: SelectType) {
    const { control } = useFormContext();
    return (
        <>
            <Controller
                name={idName}
                control={control}
                rules={{
                    required: "Collections parent can't be empty",
                }}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-3">
                        <p className="font-semibold">{children}</p>

                        <div className="relative">
                            <Select
                                items={items}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="custom-input ring-0! ">
                                    <SelectValue
                                        className="text-black"
                                        placeholder={placeholder}
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    className="bg-bg-secondary"
                                    alignOffset={10}
                                >
                                    <SelectGroup>
                                        <SelectLabel className="text-txt-primary">
                                            {label}
                                        </SelectLabel>
                                        {items.length !== 0 ? (
                                            items.map((col) => (
                                                <SelectItem
                                                    key={col.label}
                                                    value={col.value}
                                                    className="data-selected:bg-button h-10 data-highlighted:bg-bg-primary data-highlighted:text-txt-primary text-txt-secondary"
                                                >
                                                    {col.label}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <p className="text-sm flex items-center justify-center gap-2 p-4">
                                                <PackageOpen size={20} />
                                                <span className="text-txt-primary">
                                                    {emptyState}
                                                </span>
                                            </p>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Icon
                                size={14}
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-[12px] flex gap-2 items-center">
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

export default SelectField;
