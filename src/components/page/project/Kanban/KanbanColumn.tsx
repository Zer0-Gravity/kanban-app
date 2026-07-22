import { MoreHorizontal } from "lucide-react";
import CardItem from "./CardItem";

function KanbanColumn() {
    return (
        <div className="bg-gray-200 w-87.5 h-fit p-3 rounded-xl select-none">
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

            <div className="flex flex-col gap-3">
                <CardItem />
            </div>
        </div>
    );
}

export default KanbanColumn;
