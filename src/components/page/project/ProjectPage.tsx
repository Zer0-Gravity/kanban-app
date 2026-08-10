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
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const projectData = useLiveQuery(
        () => db.projects.get(projectId),
        [projectId],
    );

    if (!projectData) {
        return;
    }

    return (
        <main className="relative flex flex-col h-screen w-full px-5 justify-center pb-2 space-y-3 overflow-hidden bg-bg-primary">
            <header className="mt-8 flex justify-between">
                {isEditing ? (
                    <input
                        type="text"
                        value={projectData.projectName}
                        onChange={(e) =>
                            db.projects.update(projectData.id, {
                                projectName: e.target.value,
                            })
                        }
                        className="text-[30px] font-bold max-w-70 w-fit text-txt-primary"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setIsEditing(false);
                        }}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                    />
                ) : (
                    <h1
                        onDoubleClick={() => setIsEditing(true)}
                        className="text-[30px] font-bold"
                    >
                        {projectData.projectName}
                    </h1>
                )}
            </header>

            <section className="flex justify-between items-end">
                <div className="flex gap-4">
                    {tabs.map((tab, index) => (
                        <div key={index} className="relative">
                            <button
                                className={`flex gap-2 items-center p-2 ${activeTab === tab.title ? "font-semibold text-txt-primary" : "text-txt-secondary opacity-50"}`}
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
                                    className="absolute h-1 w-full bg-divider rounded-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex-1 min-h-0 overflow-hidden">
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
