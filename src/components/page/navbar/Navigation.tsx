import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

export function Navigation({
    link,
    name,
    icon: Icon,
    isCollapse,
}: {
    link: string;
    name: string;
    icon: LucideIcon;
    isCollapse: boolean;
}) {
    return (
        <NavLink
            to={`${link}`}
            className={({ isActive }) =>
                `flex gap-2 items-center p-3 rounded-lg ${isActive ? "underline font-semibold" : null} ${isCollapse && "justify-center"}`
            }
        >
            <Icon size={16} />
            {!isCollapse && <p className="text-[14px]">{name}</p>}
        </NavLink>
    );
}
