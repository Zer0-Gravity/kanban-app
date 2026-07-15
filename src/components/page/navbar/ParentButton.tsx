import { type LucideIcon } from "lucide-react";
import { CollapsibleTrigger } from "../../ui/collapsible";
import { SidebarMenu, SidebarMenuButton } from "../../ui/sidebar";

import type { ReactNode } from "react";

interface ParentButtonType {
    icon: LucideIcon;
    label: string;
    children?: ReactNode;
}

function ParentButton({ icon: Icon, label, children }: ParentButtonType) {
    return (
        <SidebarMenu className="relative">
            {/* Trigger Collapse */}

            <CollapsibleTrigger>
                <SidebarMenuButton className="text-[16px]">
                    <Icon size={20} />
                    <span>{label}</span>
                </SidebarMenuButton>
            </CollapsibleTrigger>

            {children}
        </SidebarMenu>
    );
}

export default ParentButton;
