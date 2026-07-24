import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./navbar/navbar";

function RootLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="relative h-full w-full flex justify-center overflow-hidden">
                <SidebarTrigger className="mb-4 absolute top-5 left-2 z-10" />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default RootLayout;
