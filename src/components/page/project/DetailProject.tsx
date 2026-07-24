import { Calendar, Dot, Flag, Plus, Save, Tag, X } from "lucide-react";
import { useModal } from "../../../store";
import Button from "../utilityComponent/Button";
import { Checkbox } from "../../ui/checkbox";
import { useNavigate, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { useSortable } from "@dnd-kit/react/sortable";
import { formatDistanceToNow } from "date-fns";

function DetailProject() {
    const { openModal } = useModal();
    const navigate = useNavigate();

    const cardId = useParams();

    const dbData = useLiveQuery(() => db.cards.get(cardId), [cardId]);
    const taskList = useLiveQuery(() => db.task.toArray());

    if (!dbData) return;

    if (!taskList) return;

    return (
        <aside className="absolute flex flex-col right-0 top-0 min-w-120 max-w-150 rounded-l-xl p-5 bg-gray-200 h-screen space-y-4">
            <header className="space-y-3">
                <div className="flex justify-between items-end">
                    <h1 className="font-semibold text-[40px]">
                        {dbData.cardName}
                    </h1>
                    <div className="flex gap-3">
                        <p className="py-1 px-2 text-sm rounded-lg bg-blue-600/20 text-blue-600 font-semibold flex gap-2 items-center">
                            <Tag size={14} />
                            Database
                        </p>
                        <p className="py-1 px-2 text-sm rounded-lg bg-red-600/20 text-red-600 font-semibold flex">
                            <Dot size={20} />
                            <span>{dbData.priority}</span>
                        </p>
                    </div>
                </div>
                <div>
                    <p className="flex gap-3 items-center ">
                        <Calendar size={14} />
                        <span className="text-sm">{`Created`}</span>
                    </p>
                    <p className="text-red-400 flex gap-3 items-center">
                        <Flag size={14} />
                        <span className="text-sm">{`Deadline in ${formatDistanceToNow(dbData.deadlineDate)}`}</span>
                    </p>
                </div>
            </header>

            {/* Description */}
            <div className="space-y-4">
                <p className="font-semibold">Description</p>
                <p className="text-sm h-35 overflow-y-auto scrollbar-custom">
                    {dbData.description}
                </p>
            </div>

            {/* Task Section */}
            <div className="space-y-4 flex-1">
                <div className="flex justify-between items-end">
                    <h1 className="font-bold">Current Task</h1>
                    <Button icon={Plus} onClick={() => openModal("new-task")}>
                        Task
                    </Button>
                </div>
                <p>
                    <div className="h-75 rounded-lg bg-gray-300 p-3 flex-col flex gap-2">
                        {taskList.length !== 0 ? (
                            taskList.map((task, index) => (
                                <SortableTask
                                    id={task.id}
                                    index={index}
                                    name={task.taskName}
                                />
                            ))
                        ) : (
                            <div className="w-full text-center p-4 font-semibold text-sm">
                                No task currently listed, start creating new
                                task and track your progress!!
                            </div>
                        )}
                    </div>
                </p>
            </div>

            <div className="flex gap-3 justify-end">
                <Button
                    icon={X}
                    customClass="bg-gray-400 text-white"
                    onClick={() => navigate(-1)}
                >
                    Close
                </Button>
                <Button icon={Save} customClass="bg-button text-white">
                    Save
                </Button>
            </div>
        </aside>
    );
}

function SortableTask({ id, index, name }) {
    const { ref } = useSortable({ id, index });

    return (
        <label
            ref={ref}
            className="bg-white h-12 p-2 flex items-center gap-3 rounded-lg has-checked:opacity-70 hover:scale-102 transition-all cursor-grab"
        >
            <Checkbox className="peer rounded-full border-2 border-button data-checked:bg-button size-5 text-white cursor-pointer" />
            <span className="font-medium select-none peer-data-checked:line-through">
                {name}
            </span>
        </label>
    );
}

export default DetailProject;
