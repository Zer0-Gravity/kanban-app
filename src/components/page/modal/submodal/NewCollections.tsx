import { Folder, PaintBucket, Palette, Save } from "lucide-react";
import Button from "../../utilityComponent/Button";
import HeaderModal from "../../utilityComponent/HeaderModal";
import ModalContainer from "../../utilityComponent/ModalContainer";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";

function NewCollections() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <ModalContainer>
            <HeaderModal title="New Collections" />

            <form className="space-y-5">
                <div className="space-y-3">
                    <p className="font-semibold">Collections title</p>

                    <div className="relative text-foreground-muted-primary">
                        <input
                            type="text"
                            className="bg-foreground-muted-secondary pl-15 py-4 pr-5 w-full rounded-xl outline-none"
                            placeholder="Collections Title"
                        />
                        <Folder
                            size={20}
                            className="absolute left-5 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>

                <div>
                    <p className="font-semibold">Color</p>

                    <Controller
                        name="theme"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="relative text-foreground-muted-primary">
                                    <HexColorInput
                                        color={field.value}
                                        onChange={field.onChange}
                                        className="bg-foreground-muted-secondary pl-15 py-4 pr-5 w-full rounded-xl outline-none"
                                        placeholder="Pick a color (Optional)"
                                    />
                                    <Palette
                                        size={20}
                                        className="absolute left-5 top-1/2 -translate-y-1/2"
                                    />
                                </div>

                                <HexColorPicker
                                    color={field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />
                </div>

                <Button
                    icon={Save}
                    customClass="bg-button text-white justify-end"
                >
                    Save
                </Button>
            </form>
        </ModalContainer>
    );
}

export default NewCollections;
