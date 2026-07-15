import { Folder } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import {
    SidebarGroupContent,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "../../ui/sidebar";

function ChildContent() {
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
        <CollapsibleContent>
            <SidebarGroupContent>
                <SidebarMenuSub>
                    {navItems.map((group, index) => (
                        <Collapsible key={index} defaultOpen={index === 0}>
                            <SidebarMenuItem>
                                <CollapsibleTrigger>
                                    <SidebarMenuButton className="w-full hover:bg-gray-300">
                                        <Folder size={20} />
                                        <span>{group.title}</span>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {group.items.map((item, index) => (
                                            <SidebarMenuSubItem key={index}>
                                                <SidebarMenuSubButton className="hover:bg-amber-200 select-none">
                                                    {item.title}
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenuSub>
            </SidebarGroupContent>
        </CollapsibleContent>
    );
}

export default ChildContent;
