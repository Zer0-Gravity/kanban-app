import type { ReactNode } from "react";

interface ModalContainerType {
    children: ReactNode;
}

function ModalContainer({ children }: ModalContainerType) {
    return <main className="bg-white w-150 rounded-xl p-5">{children}</main>;
}

export default ModalContainer;
