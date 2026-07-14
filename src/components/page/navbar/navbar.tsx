import { Folder, Plus } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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
import { useModal } from "../../../store";

function AppSidebar() {
    const { openModal, modalName } = useModal();

    const navItems = [
        {
            title: "Homework",
            items: [
                { title: "Math", url: "/homework/math" },
                { title: "English", url: "/homework/english" },
                { title: "Science", url: "/homework/science" },
            ],
        },
        {
            title: "Homework",
            items: [
                { title: "Math", url: "/homework/math" },
                { title: "English", url: "/homework/english" },
                { title: "Science", url: "/homework/science" },
            ],
        },
    ];

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu className="border border-[#222222] p-3 rounded-sm">
                    Kanban App
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="bg-amber-200 text-sm">
                        My Project
                    </SidebarGroupLabel>
                    <SidebarMenuAction
                        onClick={() => {
                            openModal("new-project");
                            console.log(modalName);
                        }}
                    >
                        <Plus />
                    </SidebarMenuAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((group, index) => (
                                <Collapsible key={index} defaultOpen>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger>
                                            <SidebarMenuButton className="w-full hover:bg-gray-300">
                                                <Folder />
                                                <span>{group.title}</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.items.map(
                                                    (item, index) => (
                                                        <SidebarMenuSubItem
                                                            key={index}
                                                        >
                                                            <SidebarMenuSubButton className="hover:bg-amber-200 select-none">
                                                                {item.title}
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ),
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="bg-amber-100 p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <button>Change Theme</button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;
