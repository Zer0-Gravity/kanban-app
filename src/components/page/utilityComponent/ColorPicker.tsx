import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Palette } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

const color_preset = [
    "#d9e3f0",
    "#f47373",
    "#697689",
    "#37d67a",
    "#2ccce4",
    "#555555",
    "#dce775",
    "#ff8a65",
    "#ba68c8",
];

function ColorPicker({ theme }: { theme?: string }) {
    const { control } = useFormContext();

    return (
        <div className="space-y-3">
            <p className="font-semibold">Color</p>

            <Controller
                name={theme}
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger className="relative flex items-center gap-3 w-full!">
                            <HexColorInput
                                color={field.value}
                                onChange={field.onChange}
                                placeholder="Pick color..."
                                className="custom-input"
                            />

                            <h1
                                style={{
                                    color: field.value,
                                    backgroundColor: `${field.value}40`,
                                }}
                                className="font-bold p-2 rounded-md"
                            >
                                Preview
                            </h1>

                            <Palette
                                size={13}
                                className="absolute top-1/2 -translate-y-1/2 left-5"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-2! bg-bg-secondary ring-0">
                            <HexColorPicker
                                color={field.value}
                                onChange={field.onChange}
                                className="react-color-pick"
                            />

                            <div className="grid grid-cols-6 gap-2">
                                {color_preset.map((pres) => (
                                    <button
                                        key={pres}
                                        style={{
                                            backgroundColor: pres,
                                        }}
                                        onClick={() => field.onChange(pres)}
                                        className={`w-5 h-5 rounded-[5px] ${field.value && field.value.toLowerCase() === pres.toLowerCase() && "border-2 border-white scale-150"}`}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            />
        </div>
    );
}

export default ColorPicker;
