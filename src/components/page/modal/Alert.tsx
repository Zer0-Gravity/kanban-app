import { AlertTriangle } from "lucide-react";
import { useModal } from "../../../store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { db } from "../../../db";
import { useNavigate } from "react-router";

function Alert() {
    const { idContainer, closeModal, modalName } = useModal();
    const navigate = useNavigate();
    const isOpen =
        modalName === "card" ||
        modalName === "column" ||
        modalName === "project" ||
        modalName === "workspace" ||
        modalName === "tag";

    console.log(modalName, idContainer);

    async function deleteItems() {
        try {
            //Delete card
            if (modalName === "card") {
                await db.transaction("rw", [db.cards, db.task], async () => {
                    await db.cards.delete(idContainer);
                });
            }

            //Delete column
            if (modalName === "column") {
                await db.transaction(
                    "rw",
                    [db.columns, db.cards, db.task],
                    async () => {
                        await db.columns.delete(idContainer);
                    },
                );
            }

            //Delete project
            if (modalName === "project") {
                await db.transaction(
                    "rw",
                    [db.projects, db.columns, db.cards, db.task],
                    async () => {
                        await db.projects.delete(idContainer);
                    },
                );
                navigate("/");
            }

            //Delete collections
            if (modalName === "workspace") {
                await db.transaction(
                    "rw",
                    [
                        db.collections,
                        db.projects,
                        db.columns,
                        db.cards,
                        db.task,
                    ],
                    async () => {
                        await db.collections.delete(idContainer);
                    },
                );
                navigate("/");
            }

            if (modalName === "tag") {
                await db.cards
                    .where("tagId")
                    .equals(idContainer)
                    .modify({ tagId: "default" });
                await db.tag.delete(idContainer);
            }

            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

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
                        <button
                            onClick={closeModal}
                            className="text-green-500 text-[16px] active:scale-95 border px-2 py-1 rounded-md hover:bg-green-500 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteItems}
                            className="text-red-500 text-[16px] active:scale-95 border px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Alert;
