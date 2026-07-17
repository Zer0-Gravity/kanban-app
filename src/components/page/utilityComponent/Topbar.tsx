import { File, Search } from "lucide-react";
import Button from "./Button";
import { useModal } from "../../../store";

function Topbar() {
    const { openModal } = useModal();

    return (
        <div className="flex justify-around w-full p-2">
            <div className="flex">
                <input
                    type="text"
                    className="border h-10 rounded-full rounded-r-none p-4 w-100 outline-none"
                    placeholder="Search project..."
                />
                <button className="h-10 border w-15 flex items-center justify-center rounded-r-full border-l-0 bg-button ]">
                    <Search color="white" />
                </button>
            </div>

            <Button
                icon={File}
                customClass="bg-button text-white"
                onClick={() => openModal("new-project")}
            >
                New Project
            </Button>
        </div>
    );
}

export default Topbar;
