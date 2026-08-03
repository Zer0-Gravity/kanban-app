import { File, Home, Search, SidebarClose, Tags } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, spring } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { Navigation } from "./Navigation";
import { Workspace } from "./Workspace";

interface DataType {
    id: string;
    name: string;
}

function Sidebar() {
    const navigate = useNavigate();
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const dbData = useLiveQuery(async () => {
        const dbProjects = await db.projects.toArray();

        //Map the data to get only the name and id
        const mappedProjects: DataType[] = dbProjects.map((p) => ({
            id: p.id,
            name: p.projectName,
        }));

        return [...mappedProjects];
    });

    //Search function
    function searchFilter() {
        if (!dbData) return;

        //Search the data based on the search state
        const filterProject = dbData.filter((data) =>
            data.name.toLowerCase().includes(search.toLowerCase()),
        );

        return filterProject;
    }

    //destructure the function
    const filterProject = searchFilter();

    return (
        <motion.main
            animate={{
                transition: { type: spring, damping: 20, stiffness: 250 },
                width: isCollapse ? "65px" : "270px",
            }}
            className="h-full rounded-r-lg p-3"
        >
            <header
                className={`flex gap-2 items-center ${isCollapse ? "justify-center" : "justify-between"}`}
            >
                {!isCollapse && (
                    <div
                        className="flex items-center gap-2"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src="/logo-kanban.svg"
                            alt="logo"
                            className="w-12.5"
                        />
                        <h1 className="text-[20px] font-extrabold select-none">
                            <span className="text-button">my</span>
                            <span>kanban</span>
                        </h1>
                    </div>
                )}

                <motion.button
                    animate={{
                        rotate: isCollapse ? 180 : 0,
                        transition: { type: spring },
                    }}
                    onClick={() => setIsCollapse(!isCollapse)}
                >
                    <SidebarClose size={18} />
                </motion.button>
            </header>

            {/* Search */}
            <div className="border-2 relative h-11.25 rounded-lg mt-7.5 text-[14px]">
                <input
                    type="text"
                    value={search}
                    className="w-full h-full pl-10 pr-4 outline-none"
                    placeholder="Search project..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    onClick={() => setIsCollapse(false)}
                />

                {/* Check if search isn't empty string   */}
                {search && (
                    <div className="border w-full max-h-50 translate-y-3 p-2 rounded-lg bg-white">
                        <div className="flex flex-col gap-3">
                            {filterProject.length !== 0 ? (
                                filterProject.map((p) => (
                                    <Link
                                        to={`project/${[p.id]}`}
                                        onClick={() => {
                                            setSearch("");
                                        }}
                                        className="flex gap-2 items-center hover:bg-slate-300 p-1 rounded-md"
                                    >
                                        <File size={12} />
                                        <p className="text-[12px]">{p.name}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-[12px] p-2">
                                    No project match
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 space-y-5">
                {!isCollapse && (
                    <p className="text-[12px] font-bold">Navigation</p>
                )}

                <div>
                    <Navigation
                        link="/"
                        name="Home"
                        icon={Home}
                        isCollapse={isCollapse}
                    />
                    <Workspace
                        isCollapse={isCollapse}
                        setCollapse={setIsCollapse}
                    />
                    <Navigation
                        link="/manage-tag"
                        name="Manage Tags"
                        icon={Tags}
                        isCollapse={isCollapse}
                    />
                </div>
            </div>
        </motion.main>
    );
}

export default Sidebar;
