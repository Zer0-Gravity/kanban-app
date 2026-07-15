import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonType {
    icon: LucideIcon;
    children: ReactNode;
    customClass?: string;
    onClick?: () => void;
}

export default function Button({
    icon: Icon,
    children,
    customClass,
    onClick,
}: ButtonType) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg ${customClass}`}
        >
            <Icon size={20} />
            <span className="font-semibold!">{children}</span>
        </button>
    );
}
