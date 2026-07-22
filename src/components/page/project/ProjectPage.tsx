import {
    CreditCard,
    Dot,
    FilterIcon,
    Flag,
    MoreHorizontal,
    Plus,
    SortAsc,
} from "lucide-react";
import { Outlet, useParams } from "react-router";
import { useModal } from "../../../store";
import Topbar from "../utilityComponent/Topbar";
import Button from "../utilityComponent/Button";

function ProjectPage() {
    const { openModal } = useModal();
    const { id } = useParams();

    return (
        <main className="relative h-full w-full px-5 pb-5 space-y-5">
            <Topbar />

            <header className="mt-8">
                <h1 className="text-[50px] font-bold">Title Project</h1>
                <p className="text-sm italic text-muted">Created 3 week ago</p>
            </header>
            <div className="flex justify-between items-end">
                <p className="max-w-200 text-sm  rounded-md text-muted italic">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat repudiandae animi rem numquam minima dicta
                    inventore, unde autem ipsam, accusantium sint cumque labore
                    magnam quae consectetur! Adipisci natus sapiente
                    reprehenderit!
                </p>

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
            </div>

            <div className="flex items-start gap-4">
                <div className="bg-gray-200 w-87.5 h-fit p-3 rounded-xl">
                    <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <p className="h-2 w-2 bg-amber-400 rounded-full"></p>
                            <p className="font-semibold">To Do</p>
                            <p className="text-muted font-bold">3</p>
                        </div>
                        <button>
                            <MoreHorizontal />
                        </button>
                    </div>

                    <div>
                        <div className="rounded-lg p-3 space-y-3 bg-white">
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <p className="py-1 px-2 text-sm rounded-lg bg-blue-600/20 text-blue-600 font-semibold">
                                        Database
                                    </p>
                                    <p className="py-1 px-2 text-sm rounded-lg bg-red-600/20 text-red-600 font-semibold flex">
                                        <Dot size={20} />
                                        <span>High</span>
                                    </p>
                                </div>
                                <MoreHorizontal />
                            </div>
                            <p className="text-[20px] font-semibold mt-3">
                                Card title
                            </p>
                            <p className="truncate text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ex placeat, dignissimos beatae
                                autem asperiores eligendi facere laudantium enim
                                ipsa, non consequuntur aspernatur earum odit
                                iusto, fugiat vel eaque. Illo, ab!
                            </p>
                            <div className="h-2 w-full bg-gray-300 rounded-full">
                                <div className="h-2 bg-blue-600 w-[20%] rounded-full"></div>
                            </div>
                            <p className="flex justify-end text-sm">
                                Progress 4/7
                            </p>
                            <div className="flex justify-between text-sm">
                                <div className="flex gap-2 items-center text-red-600">
                                    <Flag size={18} />
                                    <p>12 June 2026</p>
                                </div>
                                <p>22 Days remaining</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => openModal("new-board", id)}
                    className="bg-gray-200 p-2 rounded-lg"
                >
                    <Plus />
                </button>
            </div>

            <Outlet />
        </main>
    );
}

export default ProjectPage;
