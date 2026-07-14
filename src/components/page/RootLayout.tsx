import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./navbar/navbar";

function RootLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="">
                <SidebarTrigger className="mb-4" />

                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default RootLayout;
