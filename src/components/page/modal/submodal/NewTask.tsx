import { useState } from "react";
import HeaderModal from "../../utilityComponent/HeaderModal";

function NewTask() {
    const [task, setTask] = useState<string>("");

    const handleNewTask = () => {
        console.log(task);
    };

    return (
        <main className="bg-white">
            <HeaderModal title="New Task" />

            <div>
                <input value={task} onChange={(e) => setTask(e.target.value)} />

                <button onClick={handleNewTask}>Create</button>
            </div>
        </main>
    );
}

export default NewTask;
