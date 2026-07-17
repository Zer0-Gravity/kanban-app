import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Palette } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

function ColorPicker() {
    const { control } = useFormContext();

    return (
        <div>
            <p className="font-semibold">Color</p>

            <Controller
                name="theme"
                control={control}
                render={({ field }) => (
                    <div className="relative text-foreground-muted-primary">
                        <HexColorInput
                            color={field.value}
                            onChange={field.onChange}
                            className="bg-foreground-muted-secondary pl-15 py-4 pr-20 w-full rounded-xl outline-none"
                            placeholder="Pick a color (Optional)"
                        />

                        <Palette
                            size={20}
                            className="absolute left-5 top-1/2 -translate-y-1/2"
                        />

                        <Popover>
                            <PopoverTrigger
                                className="p-2 rounded-lg bg-white absolute right-4 top-1/2 -translate-y-1/2"
                                render={
                                    <button className="flex gap-2 items-center">
                                        <div
                                            className="h-5 w-5 rounded-full"
                                            style={{
                                                backgroundColor: field.value
                                                    ? field.value
                                                    : "#009cff",
                                            }}
                                        />
                                    </button>
                                }
                            />
                            <PopoverContent className="w-fit bg-white outline-none">
                                <HexColorPicker
                                    color={field.value}
                                    onChange={field.onChange}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
            />
        </div>
    );
}

export default ColorPicker;
