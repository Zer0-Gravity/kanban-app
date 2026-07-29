import { Controller, FormProvider, useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";
import ModalContainer from "../../utilityComponent/ModalContainer";
import CustomInputField from "../../utilityComponent/CustomInputField";
import {
    Calendar1,
    CreditCard,
    Flag,
    PackageOpen,
    Save,
    Tag,
    TagsIcon,
    TextInitial,
} from "lucide-react";
import Button from "../../utilityComponent/Button";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../../../ui/combobox";
import CustomTextArea from "../../utilityComponent/CustomTextArea";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Calendar } from "../../../ui/calendar";
import { format } from "date-fns";
import { db } from "../../../../db";
import { useModal } from "../../../../store";
import { useEffect, useState } from "react";
import SelectField from "../../utilityComponent/SelectField";
import { useNavigate } from "react-router";
import type { Card } from "../../../../type";

const selectPriority = [
    { label: "High", value: "High" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
];

interface SelectType {
    value: string;
    label: string;
}

function NewCard() {
    const method = useForm();
    const { closeModal, idContainer } = useModal();
    const navigate = useNavigate();

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
    }, [idContainer]);

    if (!tags) return;

    async function handleNewCard(data: Card) {
        try {
            //Add new card data to the database
            await db.cards.add({
                id: crypto.randomUUID(),
                columnId: idContainer,
                cardName: data.cardName,
                description: data.description,
                deadlineDate: data.deadlineDate,
                priority: data.priority,
                createdAt: new Date().toISOString(),
                tagId: data.tagId,
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer>
            <HeaderModal title="New Card" />

            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewCard)}
                    className="space-y-3"
                >
                    {/* Card Title */}
                    <CustomInputField
                        icon={CreditCard}
                        label="TItle"
                        placeholder="Card title..."
                        name="cardName"
                    />

                    {/* Description */}
                    <CustomTextArea
                        name="description"
                        label="Description"
                        icon={TextInitial}
                        placeholder="Description..."
                    />

                    {/* Deadline */}
                    <Controller
                        name="deadlineDate"
                        control={method.control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger className="bg-foreground-muted-secondary text-foreground-muted-primary py-4 pl-15 w-full rounded-xl outline-none focus-visible:ring-1 relative">
                                    <button className="w-full text-left">
                                        {field.value ? (
                                            format(field.value, "PPPP")
                                        ) : (
                                            <span>Set deadline date...</span>
                                        )}
                                        <Calendar1
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="bg-white border-none outline-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />

                    {/* Tag */}
                    <Controller
                        name="tagId"
                        control={method.control}
                        render={({ field }) => (
                            <div className="space-y-3">
                                <p className="font-semibold">Tag</p>

                                <Combobox
                                    items={tags}
                                    value={field.value}
                                    itemToStringValue={(tag) => tag.label}
                                    onValueChange={(val) =>
                                        field.onChange(val.value)
                                    }
                                >
                                    <div className="relative text-foreground-muted-primary">
                                        <ComboboxInput
                                            placeholder="Search tag.. "
                                            className="bg-foreground-muted-secondary pl-13 py-4 h-13.5 rounded-lg border-none"
                                        />

                                        <TagsIcon
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                    <ComboboxContent
                                        sideOffset={15}
                                        className="shadow-[0px_3px_6px_4px_rgba(0,0,0,0.1)]"
                                    >
                                        <ComboboxEmpty className="bg-foreground-muted-secondary rounded-xl p-5">
                                            <div className="flex justify-around items-center">
                                                <div className="flex gap-3 p-2">
                                                    <PackageOpen size={20} />
                                                    <span>
                                                        No matching tag is
                                                        found!
                                                    </span>
                                                </div>
                                                <Button
                                                    icon={Tag}
                                                    customClass="text-button"
                                                    onClick={() => {
                                                        navigate("manage-tag");
                                                        closeModal();
                                                    }}
                                                >
                                                    Manage tag
                                                </Button>
                                            </div>
                                        </ComboboxEmpty>
                                        <ComboboxList className="bg-foreground-muted-secondary rounded-xl">
                                            {(tag) => (
                                                <ComboboxItem
                                                    key={tag.value}
                                                    value={tag}
                                                    className="data-highlighted:text-white data-highlighted:bg-button data-select:bg-button"
                                                >
                                                    {tag.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        )}
                    />

                    <SelectField
                        icon={Flag}
                        idName="priority"
                        items={selectPriority}
                        label="Priority"
                        placeholder="Priority.."
                    >
                        Priority
                    </SelectField>

                    <div className="flex justify-end">
                        <Button
                            icon={Save}
                            customClass="bg-button text-white"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewCard;
