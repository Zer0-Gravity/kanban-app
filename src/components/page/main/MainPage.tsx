import { ExternalLink, File } from "lucide-react";
import Button from "../utilityComponent/Button";
import { useModal } from "../../../store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { format } from "date-fns";
import { useNavigate } from "react-router";

function MainPage() {
    const { openModal } = useModal();
    const navigate = useNavigate();

    const dbProject = useLiveQuery(() => db.projects.toArray());

    if (!dbProject) return;

    return (
        <main className="w-full md:w-162.5 space-y-5 p-3 text-txt-primary">
            <div className="flex items-center">
                <img
                    src="/logo-kanban.svg"
                    alt="logo"
                    className="h-12.5 select-none"
                />
                <h1 className="logo-image">
                    <span>my</span>Kanban
                </h1>
            </div>
            <p className="text-[14px]">
                Visualize your work, track your progress, and streamline your
                daily workflow. Everything is saved locally in your browser and
                you don't need an account. So you can pick up where you left
                off!
            </p>
            <div className="flex gap-5">
                <Button
                    icon={File}
                    onClick={() => openModal("new-collections")}
                    customClass="border"
                >
                    Create Workspace
                </Button>
            </div>
            <div className="space-y-3">
                <p className="font-semibold text-[16px]">Recent Project</p>
                <div className="flex flex-col gap-2 p-2 rounded-lg h-75 w-162.5 overflow-hidden overflow-y-auto scrollbar-none bg-bg-secondary">
                    {dbProject.length !== 0 ? (
                        dbProject.map((p) => (
                            <div className="w-full h-12.5 shadow-xs rounded-lg p-2 flex justify-between items-center bg-bg-primary">
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <File size={14} />
                                        <p className="text-[14px] font-medium">
                                            {p.projectName}
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-slate-">
                                        {format(p.createdAt, "PPPP")}
                                    </p>
                                </div>
                                <ExternalLink
                                    size={14}
                                    onClick={() => navigate(`/project/${p.id}`)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="h-full w-full">
                            <File size={16} />
                            <span>
                                Your recent project will appear here once you
                                create one!
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default MainPage;
