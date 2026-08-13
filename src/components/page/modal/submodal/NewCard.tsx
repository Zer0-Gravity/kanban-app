import { Controller, FormProvider, useForm } from "react-hook-form";
import ModalContainer from "../../utilityComponent/ModalContainer";
import CustomInputField from "../../utilityComponent/CustomInputField";
import {
    AlertCircle,
    Calendar1,
    CreditCard,
    Flag,
    Save,
    TextInitial,
} from "lucide-react";
import Button from "../../utilityComponent/Button";
import CustomTextArea from "../../utilityComponent/CustomTextArea";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Calendar } from "../../../ui/calendar";
import { format, startOfDay } from "date-fns";
import { db } from "../../../../db";
import { useModal } from "../../../../store";

import SelectField from "../../utilityComponent/SelectField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComboxTag from "../../utilityComponent/ComboxTag";

const selectPriority = [
    { label: "High", value: "High" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
];

const schema = yup
    .object({
        cardName: yup.string().required("Card name is required"),
        description: yup.string().optional(),
        deadlineDate: yup.date().required("Deadline date is required"),
        tagId: yup.string().required("Tag is required"),
        priority: yup.string().required("Priority is required"),
    })
    .required();

function NewCard() {
    const method = useForm({ resolver: yupResolver(schema) });
    const { closeModal, idContainer } = useModal();

    async function handleNewCard(data: any) {
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
        <ModalContainer
            address="new-card"
            title="Create Card"
            descriptions="Create a new card for your workflow"
        >
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
                        render={({ field, fieldState: { error } }) => (
                            <div className="space-y-3">
                                <Popover>
                                    <PopoverTrigger
                                        type="button"
                                        className="custom-input relative"
                                    >
                                        <input
                                            className="w-full h-full pointer-events-none"
                                            placeholder="Set deadline date..."
                                            value={
                                                field.value
                                                    ? format(
                                                          field.value,
                                                          "PPPP",
                                                      )
                                                    : ""
                                            }
                                        />

                                        <Calendar1
                                            size={16}
                                            className="absolute left-4 top-1/2 -translate-y-1/2"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="bg-bg-secondary ring-0! outline-0 text-txt-primary"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(day) =>
                                                day < startOfDay(new Date())
                                            }
                                            classNames={{
                                                disabled:
                                                    "pointer-event-none line-through",
                                                selected:
                                                    "bg-bg-primary text-txt-primary rounded-full ring-0",
                                                today: "bg-bg-primary rounded-full",
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                {error && (
                                    <p className="text-red-500 text-[12px] flex gap-2 items-center">
                                        <AlertCircle size={14} />
                                        {error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Tag */}
                    <ComboxTag />

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
                            <span className="text-white">Save</span>
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewCard;
