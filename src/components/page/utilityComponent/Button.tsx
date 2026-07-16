import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonType {
    icon: LucideIcon;
    children?: ReactNode;
    customClass?: string;
    type?: "submit" | "button" | "reset";
    onClick?: () => void;
}

export default function Button({
    icon: Icon,
    children,
    customClass,
    type,
    onClick,
}: ButtonType) {
    return (
        <button
            type={type ? type : "button"}
            onClick={onClick}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg ${customClass} active:scale-95 transition-all`}
        >
            <Icon size={20} />
            <span className="font-semibold!">{children}</span>
        </button>
    );
}
