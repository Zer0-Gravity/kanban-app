import { Sun } from "lucide-react";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "../../ui/sidebar";

function Footer() {
    const { state } = useSidebar();
    const isCollapse = state === "collapsed";

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem className="flex justify-center">
                    <button className="flex p-3 justify-center gap-3 items-center">
                        <Sun size={20} strokeWidth={3} />
                        {!isCollapse && <span>Change Theme</span>}
                    </button>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}

export default Footer;
