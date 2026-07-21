import { Calendar, Dot, Flag, Plus, Save, Tag, X } from "lucide-react";
import { useModal } from "../../../store";
import Button from "../utilityComponent/Button";
import { Checkbox } from "../../ui/checkbox";
import { useNavigate } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";

function DetailProject() {
    const { openModal } = useModal();
    const navigate = useNavigate();

    const taskList = useLiveQuery(() => db.task.toArray());

    if (!taskList) return;

    return (
        <aside className="absolute right-0 top-0 max-w-150 rounded-l-xl p-5 bg-gray-200 h-screen space-y-4">
            <header className="space-y-3">
                <div className="flex justify-between items-end">
                    <h1 className="font-semibold text-[40px]">Project Title</h1>
                    <div className="flex gap-3">
                        <p className="py-1 px-2 text-sm rounded-lg bg-blue-600/20 text-blue-600 font-semibold flex gap-2 items-center">
                            <Tag size={14} />
                            Database
                        </p>
                        <p className="py-1 px-2 text-sm rounded-lg bg-red-600/20 text-red-600 font-semibold flex">
                            <Dot size={20} />
                            <span>High</span>
                        </p>
                    </div>
                </div>
                <div>
                    <p className="flex gap-3 items-center ">
                        <Calendar size={14} />
                        <span className="text-sm">Date created</span>
                    </p>
                    <p className="text-red-400 flex gap-3 items-center">
                        <Flag size={14} />
                        <span className="text-sm">Deadline</span>
                    </p>
                </div>
            </header>

            {/* Description */}
            <div className="space-y-4">
                <p className="font-semibold">Description</p>
                <p className="text-sm h-35 overflow-y-auto scrollbar-custom">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officiis sed dicta, maiores, obcaecati ea modi rem
                    aspernatur culpa quam cumque error omnis repellat ipsam.
                    Quis, consequuntur. Dolores iste atque quas. Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Officiis sed
                    dicta, maiores, obcaecati ea modi rem aspernatur culpa quam
                    cumque error omnis repellat ipsam. Quis, consequuntur.
                    Dolores iste atque quas. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Officiis sed dicta, maiores,
                    obcaecati ea modi rem aspernatur culpa quam cumque error
                    omnis repellat ipsam. Quis, consequuntur. Dolores iste atque
                    quas.
                </p>
            </div>

            {/* Task Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h1 className="font-bold">Current Task</h1>
                    <Button icon={Plus} onClick={() => openModal("new-task")}>
                        Task
                    </Button>
                </div>
                <div className="h-75 rounded-lg bg-gray-300 p-3 flex-col flex gap-2">
                    {taskList.length !== 0 ? (
                        taskList.map((task) => (
                            <label className="bg-white h-12 p-2 flex items-center gap-3 rounded-lg has-checked:opacity-70 hover:scale-102 transition-all">
                                <Checkbox className="peer rounded-full border-2 border-button data-checked:bg-button size-5 text-white" />
                                <span className="font-medium select-none peer-data-checked:line-through">
                                    {task.taskName}
                                </span>
                            </label>
                        ))
                    ) : (
                        <div className="w-full text-center p-4 font-semibold text-sm">
                            No task currently listed, start creating new task
                            and track your progress!!
                        </div>
                    )}
                </div>
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

export default DetailProject;
