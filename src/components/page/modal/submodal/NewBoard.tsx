import { FormProvider, useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";
import CustomInputField from "../../utilityComponent/CustomInputField";
import { Clipboard, Save } from "lucide-react";
import ColorPicker from "../../utilityComponent/ColorPicker";
import Button from "../../utilityComponent/Button";
import ModalContainer from "../../utilityComponent/ModalContainer";

function NewBoard() {
    const method = useForm();

    const handleNewBoard = (formData: FormData) => {
        console.log(formData);
    };

    return (
        <ModalContainer>
            <HeaderModal title="New Board" />

            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewBoard)}
                    className="space-y-3"
                >
                    <CustomInputField
                        icon={Clipboard}
                        name="boardName"
                        placeholder="Board name.."
                        label="Board Name"
                    />

                    <ColorPicker />

                    <div className="flex justify-end">
                        <Button icon={Save} customClass="bg-button text-white">
                            Save
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ModalContainer>
    );
}

export default NewBoard;
