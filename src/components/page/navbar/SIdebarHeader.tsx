import { Search } from "lucide-react";
import { SidebarMenu, useSidebar } from "../../ui/sidebar";
import { useNavigate } from "react-router";

function SIdebarLogoHeader() {
    const { state } = useSidebar();
    const navigate = useNavigate();

    const isCollapse = state === "collapsed";

    return (
        <SidebarMenu>
            {/* Logo Section */}
            <div
                className="flex gap-2 items-center"
                onClick={() => navigate("/")}
            >
                <img src="/logo-kanban.svg" alt="logo" className="h-12.5" />
                {!isCollapse && (
                    <h1 className="text-[30px] font-extrabold">
                        <span className="text-button">my</span>
                        <span>kanban</span>
                    </h1>
                )}
            </div>

            {/* Search Section */}

            <div className="mt-17.5 mb-5 flex items-center justify-center">
                {isCollapse ? (
                    <Search size={20} />
                ) : (
                    <input
                        type="search"
                        className="border w-full h-10 rounded-full text-sm p-4 outline-none"
                        placeholder="Search project..."
                    />
                )}
            </div>
        </SidebarMenu>
    );
}

export default SIdebarLogoHeader;
