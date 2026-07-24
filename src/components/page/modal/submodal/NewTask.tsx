import HeaderModal from "../../utilityComponent/HeaderModal";
import { FormProvider, useForm } from "react-hook-form";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { ClipboardCheck, Save } from "lucide-react";
import Button from "../../utilityComponent/Button";
import ModalContainer from "../../utilityComponent/ModalContainer";
import type { Task } from "../../../../type";
import { db } from "../../../../db";
import { useModal } from "../../../../store";

function NewTask() {
    const method = useForm();
    const { closeModal, idContainer } = useModal();

    async function handleNewTask(data: Task) {
        try {
            await db.task.add({
                id: crypto.randomUUID(),
                taskName: data.taskName,
                cardId: idContainer,
                done: false,
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

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
                        name="taskName"
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
