import { Outlet } from "react-router";
import Sidebar from "./navbar/Sidebar";

function RootLayout() {
    return (
        <main className="flex gap-2 h-full">
            <Sidebar />
            <div className="relative h-full w-full flex justify-center overflow-hidden">
                <Outlet />
            </div>
        </main>
    );
}

export default RootLayout;
