import type { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { useModal } from "../../../store";

interface ModalContainerType {
    children: ReactNode;
    address: string;
    title: string;
    descriptions?: string;
}

function ModalContainer({
    children,
    address,
    title,
    descriptions,
}: ModalContainerType) {
    const { modalName, closeModal } = useModal();

    const isOpen = modalName === address;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) closeModal();
            }}
        >
            <DialogContent className="bg-bg-secondary ring-0">
                <DialogHeader>
                    <DialogTitle className="text-[20px] text-txt-primary font-semibold">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-[12px]">
                        {descriptions}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default ModalContainer;
