import { FormProvider, useForm } from "react-hook-form";
import ModalContainer from "../../utilityComponent/ModalContainer";
import HeaderModal from "../../utilityComponent/HeaderModal";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { File, Save } from "lucide-react";
import Button from "../../utilityComponent/Button";

function NewProject() {
    const method = useForm();

    const handleNewProject = (formData: FormData) => {
        console.log(formData);
    };

    return (
        <ModalContainer>
            <HeaderModal title="Create Project" />

            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(handleNewProject)}>
                    <CustomInputField
                        icon={File}
                        name="title"
                        label="Project Title"
                        placeholder="Project title..."
                    />
                    <Button icon={Save} type="submit">
                        Save
                    </Button>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewProject;
