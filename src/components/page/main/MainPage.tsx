import { Plus } from "lucide-react";

function MainPage() {
    return (
        <main className="w-screen h-screen">
            <h1>Kanban</h1>
            <p>
                Visualize your work, track your progress, and streamline your
                daily workflow. Everything is saved locally in your browser and
                you don't need an account. So you can pick up where you left
                off!
            </p>
            <button>
                <Plus />
                Create Project
            </button>
        </main>
    );
}

export default MainPage;
