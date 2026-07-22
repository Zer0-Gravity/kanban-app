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
import { PackageOpen, type LucideIcon } from "lucide-react";
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
}

function SelectField({ idName, items, icon: Icon, children }: SelectType) {
    const { control } = useFormContext();
    return (
        <>
            <Controller
                name={idName}
                control={control}
                rules={{
                    required: "Collections parent can't be empty",
                }}
                render={({ field }) => (
                    <div className="space-y-3">
                        <p className="font-semibold">{children}</p>

                        <div className="relative text-foreground-muted-primary">
                            <Select
                                items={items}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="bg-foreground-muted-secondary pl-15 pr-5 w-full h-14! rounded-lg outline-none border-none focus-visible:ring-1">
                                    <SelectValue placeholder="Choose collections parent..." />
                                </SelectTrigger>
                                <SelectContent
                                    className="bg-foreground-muted-secondary"
                                    alignOffset={10}
                                >
                                    <SelectGroup>
                                        <SelectLabel>
                                            Collections list
                                        </SelectLabel>
                                        {items.length !== 0 ? (
                                            items.map((col) => (
                                                <SelectItem
                                                    key={col.label}
                                                    value={col.value}
                                                    className="data-selected:bg-button h-10 data-highlighted:bg-button data-highlighted:text-white"
                                                >
                                                    {col.label}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <p className="text-sm flex items-center justify-center gap-2 p-4">
                                                <PackageOpen size={20} />
                                                <span>
                                                    No column available in this
                                                    project, lets create one!
                                                </span>
                                            </p>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Icon
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default SelectField;
