import { FormProvider, useForm } from "react-hook-form";
import ModalContainer from "../../utilityComponent/ModalContainer";
import HeaderModal from "../../utilityComponent/HeaderModal";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { File, Folder, Save, TextInitial } from "lucide-react";
import Button from "../../utilityComponent/Button";
import type { Projects } from "../../../../type";
import CustomTextArea from "../../utilityComponent/CustomTextArea";
import { db } from "../../../../db";
import { useEffect, useState } from "react";
import { useModal } from "../../../../store";
import SelectField from "../../utilityComponent/SelectField";

function NewProject() {
    const method = useForm();
    const { closeModal } = useModal();
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

    async function handleNewProject(data: Projects) {
        try {
            await db.projects.add({
                id: crypto.randomUUID(),
                collectionsId: data.collectionsId,
                projectName: data.projectName,
                description: data.description,
                createdAt: new Date().toISOString(),
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

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
                        name="projectName"
                        label="Project Title"
                        placeholder="Project title..."
                    />

                    <CustomTextArea
                        name="description"
                        icon={TextInitial}
                        label="Description"
                        placeholder="Description..."
                    />

                    <SelectField
                        icon={Folder}
                        idName="collectionsId"
                        items={select}
                        label="Collections"
                        placeholder="Collections parent..."
                        emptyState="No collection folder available, let's create one to start"
                    >
                        Collection
                    </SelectField>

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
