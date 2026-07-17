import { Controller, FormProvider, useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";
import ModalContainer from "../../utilityComponent/ModalContainer";
import CustomInputField from "../../utilityComponent/CustomInputField";
import {
    Calendar1,
    CreditCard,
    PackageOpen,
    Plus,
    Save,
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

function NewCard() {
    const method = useForm();
    const tag = ["Database", "UI/UX", "API", "Route"];

    const handleNewCard = (formData: FormData) => {
        console.log(formData);
    };

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
                        name="deadline"
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
                        name="tag"
                        control={method.control}
                        render={({ field }) => (
                            <div className="space-y-3">
                                <p className="font-semibold">Tag</p>

                                <Combobox
                                    items={tag}
                                    value={field.value}
                                    onValueChange={(val) => field.onChange(val)}
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
                                                    icon={Plus}
                                                    customClass="text-button"
                                                >
                                                    Create Tag?
                                                </Button>
                                            </div>
                                        </ComboboxEmpty>
                                        <ComboboxList className="bg-foreground-muted-secondary rounded-xl">
                                            {(items) => (
                                                <ComboboxItem
                                                    key={items}
                                                    value={items}
                                                    className="data-highlighted:text-white data-highlighted:bg-button data-select:bg-button"
                                                >
                                                    {items}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        )}
                    />

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
