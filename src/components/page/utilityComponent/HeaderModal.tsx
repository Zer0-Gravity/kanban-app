import { X } from "lucide-react";
import { useModal } from "../../../store";

function HeaderModal({ title }: { title: string }) {
    const { closeModal } = useModal();
    return (
        <header className="flex justify-between mb-8">
            <h1 className="text-xl font-medium">{title}</h1>
            <button onClick={closeModal}>
                <X />
            </button>
        </header>
    );
}

export default HeaderModal;
