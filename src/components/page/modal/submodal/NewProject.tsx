import { Controller, FormProvider, useForm } from "react-hook-form";
import ModalContainer from "../../utilityComponent/ModalContainer";
import HeaderModal from "../../utilityComponent/HeaderModal";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { File, Folder, Save, TextInitial } from "lucide-react";
import Button from "../../utilityComponent/Button";
import type { Projects } from "../../../../type";
import CustomTextArea from "../../utilityComponent/CustomTextArea";
import { db } from "../../../../db";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { useEffect, useState } from "react";

function NewProject() {
    const method = useForm();
    const [select, setSelect] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                //Get the collections from database
                const folder = await db.collections.toArray();

                //Map the collections to match select component
                const collections = folder.map((col) => ({
                    label: col.collectionName,
                    value: col.id,
                }));

                setSelect(collections);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    async function handleNewProject(data: Projects) {}

    return (
        <ModalContainer>
            <HeaderModal title="Create Project" />

            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewProject)}
                    className="space-y-3"
                >
                    <CustomInputField
                        icon={File}
                        name="title"
                        label="Project Title"
                        placeholder="Project title..."
                    />

                    <CustomTextArea
                        name="description"
                        icon={TextInitial}
                        label="Description"
                        placeholder="Description..."
                    />

                    <Controller
                        name="collectionsParent"
                        control={method.control}
                        rules={{
                            required: "Collections parent can't be empty",
                        }}
                        render={({ field }) => (
                            <div className="space-y-3">
                                <p className="font-semibold">
                                    Select Collections
                                </p>

                                <div className="relative text-foreground-muted-primary">
                                    <Select
                                        items={select}
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
                                                {select.map((col) => (
                                                    <SelectItem
                                                        key={col.label}
                                                        value={col.value}
                                                        className="data-selected:bg-button h-10 data-highlighted:bg-button data-highlighted:text-white"
                                                    >
                                                        {col.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Folder
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2"
                                    />
                                </div>
                            </div>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            icon={Save}
                            type="submit"
                            customClass="bg-button text-white"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewProject;
