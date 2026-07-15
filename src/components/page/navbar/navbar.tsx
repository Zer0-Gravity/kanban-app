import { Folder, Plus, Settings, Tag } from "lucide-react";
import { Collapsible, CollapsibleContent } from "../../ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "../../ui/sidebar";

import ParentButton from "./ParentButton";
import ChildContent from "./ChildContent";
import { useModal } from "../../../store";
import SIdebarLogoHeader from "./SIdebarHeader";
import Footer from "./Footer";

function AppSidebar() {
    const { openModal } = useModal();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SIdebarLogoHeader />
            </SidebarHeader>

            <SidebarContent>
                {/* Project Content */}
                <Collapsible defaultOpen>
                    <SidebarGroup>
                        <ParentButton icon={Folder} label="My Projects">
                            <SidebarMenuAction
                                onClick={() => openModal("new-project")}
                            >
                                <Plus />
                            </SidebarMenuAction>
                        </ParentButton>

                        {/* My Projects children */}
                        <ChildContent />
                    </SidebarGroup>
                </Collapsible>

                {/* Additional Setting */}
                <Collapsible>
                    <SidebarGroup className="pt-0">
                        <SidebarMenu>
                            <SidebarMenuItem className="relative">
                                <ParentButton
                                    icon={Settings}
                                    label="Additional Setting"
                                />
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                <Tag size={20} />
                                                <span>Manage Tags</span>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <Footer />
            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;
