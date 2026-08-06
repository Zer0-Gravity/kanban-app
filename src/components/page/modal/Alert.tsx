import { AlertTriangle } from "lucide-react";
import { useModal } from "../../../store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";

function Alert() {
    const { closeModal, modalName } = useModal();

    const isOpen = modalName ? true : false;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) closeModal();
            }}
        >
            <DialogContent className="bg-white ring-0">
                <DialogHeader>
                    <DialogTitle className="text-[16px] font-semibold">
                        <p className="text-red-500">Delete this {modalName}?</p>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="flex gap-3 border-2 p-3 rounded-md border-red-500">
                        <AlertTriangle size={30} color="red" />
                        <p className="text-red-500">
                            Deleting this {modalName} will permanently remove
                            all of its content. This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button className="text-green-500 text-[16px] active:scale-95 border px-2 py-1 rounded-md hover:bg-green-500 hover:text-white transition-all">
                            Cancel
                        </button>
                        <button className="text-red-500 text-[16px] active:scale-95 border px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-all">
                            Delete
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Alert;
