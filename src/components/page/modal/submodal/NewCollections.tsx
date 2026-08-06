import { Folder, Save } from "lucide-react";
import Button from "../../utilityComponent/Button";
import ModalContainer from "../../utilityComponent/ModalContainer";
import { FormProvider, useForm } from "react-hook-form";
import CustomInputField from "../../utilityComponent/CustomInputField";
import ColorPicker from "../../utilityComponent/ColorPicker";
import { db } from "../../../../db";
import type { Collections } from "../../../../type";
import { useModal } from "../../../../store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//Yup validator

const schema = yup
    .object({
        collectionName: yup.string().required("Workspace name is required!"),
    })
    .required();

function NewCollections() {
    const method = useForm({
        resolver: yupResolver(schema),
    });
    const { closeModal } = useModal();

    async function handleNewCollections(data: Collections) {
        try {
            //Add data to the collections table
            await db.collections.add({
                id: crypto.randomUUID(),
                collectionName: data.collectionName,
                collectionsTheme: data.collectionsTheme,
                createdAt: new Date().toLocaleDateString(),
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer address="new-collections" title="Create Workspace">
            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(handleNewCollections)}
                    className="space-y-5"
                >
                    <CustomInputField
                        icon={Folder}
                        name="collectionName"
                        label="Workspace name"
                        placeholder="Collections Name"
                    />

                    {/* Color input */}
                    <ColorPicker theme="collectionsTheme" />

                    <div className="flex justify-end">
                        <Button
                            icon={Save}
                            customClass="bg-button text-white justify-end"
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

export default NewCollections;
