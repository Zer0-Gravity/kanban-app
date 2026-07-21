import { Folder, Home, Plus, Settings, Tag } from "lucide-react";
import { Collapsible, CollapsibleContent } from "../../ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
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
import { Link, NavLink } from "react-router";

function AppSidebar() {
    const { openModal } = useModal();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SIdebarLogoHeader />
            </SidebarHeader>

            <SidebarContent>
                {/* Home button */}
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuButton>
                            <NavLink
                                to={"/"}
                                className="flex gap-2 text-[16px]"
                            >
                                <Home size={20} />
                                <span>Home</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarGroup>

                {/* Project Content */}
                <Collapsible defaultOpen>
                    <SidebarGroup>
                        <ParentButton icon={Folder} label="My Projects">
                            <SidebarMenuAction
                                onClick={() => openModal("new-collections")}
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
                                                <Link
                                                    to={"/manage-tag"}
                                                    className="flex gap-2"
                                                >
                                                    <Tag size={20} />
                                                    <span>Manage Tags</span>
                                                </Link>
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
