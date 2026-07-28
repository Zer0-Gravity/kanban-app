import { Eye, Kanban } from "lucide-react";
import { Outlet, useParams } from "react-router";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import KanbanBoard from "./Kanban/KanbanBoard";
import { motion } from "motion/react";
import { useState } from "react";
import OverviewPage from "./OverviewPage";

function ProjectPage() {
    const { projectId } = useParams();

    const tabs = [
        { title: "Overview", icon: Eye },
        { title: "Kanban", icon: Kanban },
    ];

    const [activeTab, setActiveTab] = useState<string>("Kanban");

    const projectData = useLiveQuery(
        () => db.projects.get(projectId),
        [projectId],
    );

    if (!projectData) {
        return;
    }

    return (
        <main className="relative flex flex-col h-screen w-full px-5 justify-center pb-2 space-y-3 overflow-hidden bg-slate-300">
            <header className="mt-8 flex justify-between">
                <h1 className="text-[30px] font-bold">
                    {projectData.projectName}
                </h1>
            </header>

            <section className="flex justify-between items-end">
                <div className="flex gap-4">
                    {tabs.map((tab, index) => (
                        <div key={index} className="relative">
                            <button
                                className={`flex gap-2 items-center p-2 ${activeTab === tab.title ? "font-semibold" : "text-slate-500"}`}
                                onClick={() => setActiveTab(tab.title)}
                            >
                                <tab.icon size={14} />
                                <p className="text-[14px]">{tab.title}</p>
                            </button>

                            {activeTab === tab.title && (
                                <motion.div
                                    layoutId="tab"
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                    }}
                                    className="absolute h-1 w-full bg-black rounded-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-full min-h-0 w-full scrollbar-custom">
                {/* Overview */}
                {activeTab === "Overview" && (
                    <OverviewPage
                        key={projectData.id}
                        descriptions={projectData.description}
                        id={projectData.id}
                    />
                )}

                {/* Column container */}
                {activeTab === "Kanban" && (
                    <KanbanBoard
                        key={projectData.id}
                        activeProject={projectData.id}
                    />
                )}
            </div>

            <Outlet />
        </main>
    );
}

export default ProjectPage;
