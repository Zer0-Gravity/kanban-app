import ModalContainer from "../utilityComponent/ModalContainer";
import { useModal } from "../../../store";
import { db } from "../../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Controller, useForm } from "react-hook-form";
import { Palette, Save, Tag } from "lucide-react";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Button from "../utilityComponent/Button";

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

function UpdateTag() {
    const { idContainer, closeModal } = useModal();
    const tagDb = useLiveQuery(() => {
        if (!idContainer) return; //Check if id is not undefined

        return db.tag.get(idContainer);
    }, [idContainer]);

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            tagName: "",
            tagColor: "",
        },
    });

    //Change the form default value with the database
    useEffect(() => {
        if (tagDb) {
            reset({
                tagName: tagDb.tagName,
                tagColor: tagDb.tagColor,
            });
        }
    }, [tagDb, reset]);

    async function handleUpdateTag(data: any) {
        try {
            //Update the database
            await db.tag.update(idContainer, {
                tagName: data.tagName,
                tagColor: data.tagColor,
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    if (!tagDb) return;

    return (
        <ModalContainer address="update-tag" title="Update tag">
            <form
                onSubmit={handleSubmit(handleUpdateTag)}
                className="space-y-3"
            >
                <div className="space-y-2">
                    <p className="font-semibold text-[14px]">Task name</p>
                    <div className="relative">
                        <input
                            {...register("tagName")}
                            type="text"
                            className="custom-input"
                            autoComplete="off"
                        />

                        <Tag
                            size={14}
                            className="absolute top-1/2 -translate-y-1/2 left-5"
                        />
                    </div>
                </div>

                <Controller
                    name="tagColor"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <p className="font-semibold text-[14px]">
                                Color tag
                            </p>
                            <Popover>
                                <PopoverTrigger className="relative flex items-center gap-3 w-full!">
                                    <HexColorInput
                                        color={field.value}
                                        onChange={field.onChange}
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
                                                onClick={() =>
                                                    field.onChange(pres)
                                                }
                                                className={`w-5 h-5 rounded-[5px] ${field.value.toLowerCase() === pres.toLowerCase() && "border-2 border-white scale-150"}`}
                                            />
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        icon={Save}
                        customClass="bg-button text-txt-primary"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </ModalContainer>
    );
}

export default UpdateTag;
