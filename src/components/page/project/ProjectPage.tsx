import { CreditCard, FilterIcon, Plus, Search, SortAsc } from "lucide-react";
import { Outlet, useParams } from "react-router";
import { useModal } from "../../../store";
import Button from "../utilityComponent/Button";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { format, formatDistanceToNow } from "date-fns";
import ColumnComponent from "./ColumnComponent";

function ProjectPage() {
    const { openModal } = useModal();
    const { id } = useParams();

    const projectData = useLiveQuery(() => db.projects.get(id));

    if (!projectData) {
        return;
    }

    return (
        <main className="relative flex flex-col h-screen w-full px-5 pb-5 space-y-3 overflow-hidden">
            <header className="mt-8 flex justify-between">
                <div>
                    <h1 className="text-[50px] font-bold">
                        {projectData.projectName}
                    </h1>
                    <p className="text-sm italic text-muted">
                        {`Created ${formatDistanceToNow(projectData.createdAt)} ago / ${format(projectData.createdAt, "PPPP")}`}
                    </p>
                </div>

                {/* Search card section */}
                <div className="text-foreground-muted-primary flex items-center">
                    <input
                        type="text"
                        className="bg-foreground-muted-secondary p-2 w-70 rounded-lg border-none"
                        placeholder="Search card..."
                    />
                    <Button
                        icon={Plus}
                        customClass="text-sm! text-button"
                        onClick={() => openModal("new-project")}
                    >
                        New Project
                    </Button>
                </div>
            </header>

            <section className="flex justify-between items-end">
                <div className="space-y-2">
                    <p className="text-xs italic font-semibold">Description</p>
                    <p className="max-w-200 text-sm  rounded-md text-muted italic border h-full w-full p-3">
                        {projectData.description
                            ? projectData.description
                            : "No description"}
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex gap-3 justify-end max-h-10">
                    <Button icon={FilterIcon} customClass="border">
                        Filter by
                    </Button>
                    <Button icon={SortAsc} customClass="border">
                        Sort by
                    </Button>
                    <Button
                        icon={CreditCard}
                        customClass="bg-button text-white"
                        onClick={() => openModal("new-card")}
                    >
                        New Card
                    </Button>
                </div>
            </section>

            {/* Column container */}
            <div className="flex-1 min-h-0">
                <div className="flex items-start gap-4 overflow-auto py-3 h-full scrollbar-custom">
                    <ColumnComponent />

                    <button
                        onClick={() => openModal("new-board", id)}
                        className="bg-gray-200 p-2 rounded-lg"
                    >
                        <Plus />
                    </button>
                </div>
            </div>

            <Outlet />
        </main>
    );
}

export default ProjectPage;
