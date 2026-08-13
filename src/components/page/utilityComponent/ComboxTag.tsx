import { Controller, useFormContext } from "react-hook-form";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../../ui/combobox";
import { AlertCircle, PackageOpen, Tag, TagsIcon } from "lucide-react";
import Button from "./Button";
import { useEffect, useState } from "react";
import { db } from "../../../db";
import { useNavigate } from "react-router";
import { useModal } from "../../../store";

interface SelectType {
    value: string;
    label: string;
}

function ComboxTag() {
    const { control } = useFormContext();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const [tags, setTags] = useState<SelectType[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                //Get the column data from the database
                const tags = await db.tag.toArray();

                const mappedTag = tags.map((t) => ({
                    value: t.id,
                    label: t.tagName,
                }));

                setTags(mappedTag);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Controller
                name="tagId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-3">
                        <p className="font-semibold">Tag</p>

                        <Combobox
                            items={tags}
                            value={field.value}
                            itemToStringValue={(tag) => tag.label}
                            onValueChange={(val) => field.onChange(val.value)}
                        >
                            <div className="relative">
                                <ComboboxInput
                                    placeholder="Search tag.. "
                                    className="custom-input border-0"
                                />

                                <TagsIcon
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2"
                                />
                            </div>
                            <ComboboxContent
                                sideOffset={15}
                                className="shadow-[0px_3px_6px_4px_rgba(0,0,0,0.1)]"
                            >
                                <ComboboxEmpty className="bg-bg-secondary!">
                                    <div className="flex gap-4 rounded-lg!">
                                        <div className="flex gap-3 p-2 ">
                                            <PackageOpen
                                                size={20}
                                                className="text-txt-primary"
                                            />
                                            <span className="text-[12px]">
                                                No matching tag is found!
                                            </span>
                                        </div>
                                        <Button
                                            icon={Tag}
                                            customClass="text-txt-secondary"
                                            onClick={() => {
                                                navigate("manage-tag");
                                                closeModal();
                                            }}
                                        >
                                            <span className="text-txt-secondary text-[14px]">
                                                New tag?
                                            </span>
                                        </Button>
                                    </div>
                                </ComboboxEmpty>
                                <ComboboxList className="bg-bg-secondary rounded-xl">
                                    {(tag) => (
                                        <ComboboxItem
                                            key={tag.value}
                                            value={tag}
                                            className="data-highlighted:bg-bg-primary data-highlighted:text-txt-primary data-select:bg-button text-txt-secondary"
                                        >
                                            {tag.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
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

export default ComboxTag;
