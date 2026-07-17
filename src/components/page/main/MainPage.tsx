import { CloudUpload, Database, File, Folder } from "lucide-react";
import Button from "../utilityComponent/Button";
import { useModal } from "../../../store";

function MainPage() {
    const { openModal } = useModal();

    return (
        <main className="w-full md:w-166.25 space-y-5 p-3">
            <div className="flex items-center">
                <img
                    src="/logo-kanban.svg"
                    alt="logo"
                    className="h-25 select-none"
                />
                <h1 className="logo-image">
                    <span>my</span>Kanban
                </h1>
            </div>
            <p className="text-lg">
                Visualize your work, track your progress, and streamline your
                daily workflow. Everything is saved locally in your browser and
                you don't need an account. So you can pick up where you left
                off!
            </p>
            <div className="flex gap-5">
                <Button
                    icon={File}
                    customClass="bg-button text-white"
                    onClick={() => openModal("new-project")}
                >
                    New Project
                </Button>
                <Button
                    icon={Folder}
                    customClass="bg-button text-white"
                    onClick={() => openModal("new-collections")}
                >
                    New Collections
                </Button>
            </div>
            <div className="space-y-3">
                <p className="font-semibold text-lg">Recent Project</p>
                <div className="h-50 border rounded-lg p-2 flex flex-col">
                    <div className="w-full h-full flex items-center justify-center">
                        <span>
                            Your recent project will appear here once you create
                            one!
                        </span>
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button icon={Database} customClass="border">
                        Import Data
                    </Button>
                    <Button icon={CloudUpload} customClass="border">
                        Export Data
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default MainPage;
