import ModalContainer from "../../utilityComponent/ModalContainer";
import { FormProvider, useForm } from "react-hook-form";
import CustomInputField from "../../utilityComponent/CustomInputField";

import { Save, Tags } from "lucide-react";
import type { Tag } from "../../../../type";
import { db } from "../../../../db";
import { useModal } from "../../../../store";
import Button from "../../utilityComponent/Button";
import ColorPicker from "../../utilityComponent/ColorPicker";

function NewTag() {
    const method = useForm();
    const { closeModal } = useModal();

    async function handleNewTag(data: Tag) {
        try {
            await db.tag.add({
                id: crypto.randomUUID(),
                tagName: data.tagName,
                tagColor: data.tagColor,
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer
            address="new-tag"
            title="Create Tag"
            descriptions="Create new tag to organize your work!"
        >
            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewTag)}
                    className="space-y-3"
                >
                    <CustomInputField
                        icon={Tags}
                        name="tagName"
                        label="Task title"
                        placeholder="Task title..."
                    />

                    <ColorPicker theme="tagColor" />

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

export default NewTag;
