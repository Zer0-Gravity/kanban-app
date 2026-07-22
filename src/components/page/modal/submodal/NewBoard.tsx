import { FormProvider, useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { Clipboard, Save } from "lucide-react";
import ColorPicker from "../../utilityComponent/ColorPicker";
import Button from "../../utilityComponent/Button";
import ModalContainer from "../../utilityComponent/ModalContainer";
import type { Columns } from "../../../../type";
import { db } from "../../../../db";
import { useModal } from "../../../../store";

function NewBoard() {
    const method = useForm();
    const { idContainer, closeModal } = useModal();

    async function handleNewColumn(data: Columns) {
        try {
            await db.columns.add({
                id: crypto.randomUUID(),
                projectId: idContainer,
                columnName: data.columnName,
                columnTheme: data.columnTheme,
                createdAt: new Date().toISOString(),
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer>
            <HeaderModal title="New Board" />

            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewColumn)}
                    className="space-y-3"
                >
                    <CustomInputField
                        icon={Clipboard}
                        name="columnName"
                        placeholder="Column name.."
                        label="Column Name"
                    />

                    <ColorPicker theme="columnTheme" />

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

export default NewBoard;
