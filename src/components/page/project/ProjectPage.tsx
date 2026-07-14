import {
    FilterIcon,
    MoreHorizontal,
    Plus,
    Search,
    SortAsc,
} from "lucide-react";
import { Outlet } from "react-router";
import { useModal } from "../../../store";
import Topbar from "../utilityComponent/Topbar";

function ProjectPage() {
    const { openModal } = useModal();

    return (
        <main className="relative">
            <Topbar />

            <header>
                <h1>Title Project</h1>
                <p>date created</p>
            </header>

            {/* Navigation */}
            <div>
                <button>
                    <FilterIcon />
                    Filter by
                </button>
                <button>
                    <SortAsc />
                    Sort by
                </button>
                <button onClick={() => openModal("new-card")}>
                    <Plus />
                    New Card
                </button>
            </div>

            <div>
                <div className="border">
                    <h1>Board Title</h1>
                    <button>
                        <MoreHorizontal />
                    </button>

                    <div>
                        <div className="border">
                            <div>
                                <h1>Card Tag</h1>
                                <MoreHorizontal />
                            </div>
                            <h1>Card title</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ex placeat, dignissimos beatae
                                autem asperiores eligendi facere laudantium enim
                                ipsa, non consequuntur aspernatur earum odit
                                iusto, fugiat vel eaque. Illo, ab!
                            </p>
                            <div className="h-2 w-full bg-black" />
                            <p>4/7</p>
                            <div>
                                <p>Deadline</p>
                                <p>22 Days remaining</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => openModal("new-board")}>
                    <Plus />
                </button>
            </div>

            <Outlet />
        </main>
    );
}

export default ProjectPage;
