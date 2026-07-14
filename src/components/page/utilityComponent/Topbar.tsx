import { Search } from "lucide-react";

function Topbar() {
    return (
        <div className="flex justify-around h-10 w-full bg-red-50">
            <div>
                <input type="text" />
                <button>
                    <Search />
                </button>
            </div>
            <div>
                <button>New Badge</button>
                <button>New Project</button>
            </div>
        </div>
    );
}

export default Topbar;
