import { Plus } from "lucide-react";

function DetailProject() {
    return (
        <aside className="absolute right-0">
            <header>
                <h1>Project Title</h1>
                <p>Date created</p>
                <p>Deadline</p>
            </header>

            {/* Description */}
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis sed dicta, maiores, obcaecati ea modi rem aspernatur
                culpa quam cumque error omnis repellat ipsam. Quis,
                consequuntur. Dolores iste atque quas.
            </p>

            {/* Task Section */}
            <div>
                <div>
                    <h1>Task</h1>
                    <button>
                        <Plus />
                        Create Task
                    </button>
                </div>
                <div>
                    <div>
                        <input type="checkbox" />
                        <p>Task Title</p>
                    </div>
                </div>
            </div>

            <div>
                <button>Close</button>
                <button>Save</button>
            </div>
        </aside>
    );
}

export default DetailProject;
