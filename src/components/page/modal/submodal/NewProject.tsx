import { FormProvider, useForm } from "react-hook-form";
import ModalContainer from "../../utilityComponent/ModalContainer";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { File, Save, TextInitial } from "lucide-react";
import Button from "../../utilityComponent/Button";
import type { Projects } from "../../../../type";
import CustomTextArea from "../../utilityComponent/CustomTextArea";
import { db } from "../../../../db";
import { useModal } from "../../../../store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
    .object({
        projectName: yup.string().required("Project name is required!"),
    })
    .required();

function NewProject() {
    const method = useForm({ resolver: yupResolver(schema) });
    const { closeModal, idContainer } = useModal();

    async function handleNewProject(data: Projects) {
        try {
            await db.projects.add({
                id: crypto.randomUUID(),
                collectionsId: idContainer,
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
        <ModalContainer address="new-project" title="Create Project">
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

                    <div className="flex justify-end">
                        <Button
                            icon={Save}
                            type="submit"
                            customClass="bg-button text-white"
                        >
                            <span className="text-white">Save</span>
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewProject;
