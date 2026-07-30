import {
    File,
    HardDrive,
    Home,
    Plus,
    Search,
    SidebarClose,
    Tags,
    type LucideIcon,
} from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, spring } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import { useModal } from "../../../store";

function Sidebar() {
    const navigate = useNavigate();
    const [isCollapse, setIsCollapse] = useState<boolean>(false);

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
                    className="w-full h-full pl-10 pr-4 outline-none"
                />
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    onClick={() => setIsCollapse(false)}
                />
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

function Navigation({
    link,
    name,
    icon: Icon,
    isCollapse,
}: {
    link: string;
    name: string;
    icon: LucideIcon;
    isCollapse: boolean;
}) {
    return (
        <NavLink
            to={`${link}`}
            className={({ isActive }) =>
                `flex gap-2 items-center p-3 rounded-lg ${isActive ? "bg-button text-white" : null} ${isCollapse && "justify-center"}`
            }
        >
            <Icon size={16} />
            {!isCollapse && <p className="text-[14px]">{name}</p>}
        </NavLink>
    );
}

const MotionCollapse = motion.create(Collapsible);

function Workspace({
    isCollapse,
    setCollapse,
}: {
    isCollapse: boolean;
    setCollapse: Dispatch<SetStateAction<boolean>>;
}) {
    const { openModal } = useModal();
    const collectionsTree = useLiveQuery(async () => {
        const parentFolder = await db.collections.toArray();

        //Get the child content from the parent folder
        const childContentPromise = parentFolder.map(async (folder) => {
            const content = await db.projects
                .where("collectionsId") //get the collectionsId
                .equals(folder.id) // and then compare it with the id on the collection database
                .toArray();

            //Combine all data into one structure
            return {
                ...folder,
                project: content,
            };
        });

        //return the data using promise.all
        return Promise.all(childContentPromise);
    });

    if (!collectionsTree) {
        return;
    }

    return (
        <Collapsible defaultOpen={collectionsTree.length !== 0}>
            <CollapsibleTrigger className="flex p-3 justify-between w-full items-center">
                <div className="flex gap-2 items-center">
                    <HardDrive
                        size={14}
                        onClick={(e) => {
                            setCollapse(false);
                            e.stopPropagation();
                        }}
                    />
                    {!isCollapse && <p className="text-[14px]">Workspace</p>}
                </div>
                <Plus size={14} onClick={() => openModal("new-collections")} />
            </CollapsibleTrigger>

            {/* Projects List */}
            {!isCollapse &&
                collectionsTree.map((project, index) => (
                    <CollapsibleContent key={project.id}>
                        <MotionCollapse
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -5, opacity: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CollapsibleTrigger className="group hover:bg-gray-200 transition-all px-2 rounded-lg flex justify-between w-full">
                                <div className="flex gap-2 items-center p-2 ml-4">
                                    <File size={14} />
                                    <p className="text-[14px]">
                                        {project.collectionName}
                                    </p>
                                </div>
                                <button>
                                    <Plus
                                        className="hidden group-hover:block"
                                        size={13}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(
                                                "new-project",
                                                project.id,
                                            );
                                        }}
                                    />
                                </button>
                            </CollapsibleTrigger>

                            {/* Project children list */}
                            <CollapsibleContent>
                                {project.project.map((file) => (
                                    <MotionCollapse
                                        key={file.id}
                                        initial={{ y: -5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -5, opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            key={file.id}
                                            to={`/project/${file.id}`}
                                            className={({ isActive }) =>
                                                `text-[14px] ml-12 ${isActive ? "underline font-semibold" : null}`
                                            }
                                        >
                                            {file.projectName}
                                        </NavLink>
                                    </MotionCollapse>
                                ))}
                            </CollapsibleContent>
                        </MotionCollapse>
                    </CollapsibleContent>
                ))}
        </Collapsible>
    );
}

export default Sidebar;
