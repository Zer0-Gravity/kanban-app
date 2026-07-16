import HeaderModal from "../../utilityComponent/HeaderModal";
import { FormProvider, useForm } from "react-hook-form";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { ClipboardCheck, Save } from "lucide-react";
import Button from "../../utilityComponent/Button";
import ModalContainer from "../../utilityComponent/ModalContainer";

function NewTask() {
    const method = useForm();

    const handleNewTask = (formData: FormData) => {
        console.log(formData);
    };

    return (
        <ModalContainer>
            <HeaderModal title="New Task" />

            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewTask)}
                    className="space-y-3"
                >
                    <CustomInputField
                        icon={ClipboardCheck}
                        name="title"
                        label="Task title"
                        placeholder="Task title..."
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

export default NewTask;
