import { X } from "lucide-react";
import { useModal } from "../../../store";

function HeaderModal({ title }: { title: string }) {
    const { closeModal } = useModal();
    return (
        <header>
            <h1>{title}</h1>
            <button onClick={closeModal}>
                <X />
            </button>
        </header>
    );
}

export default HeaderModal;
