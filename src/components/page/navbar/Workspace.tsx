import { motion } from "motion/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import { useModal } from "../../../store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
    File,
    HardDrive,
    Minus,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import { NavLink } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const MotionCollapse = motion.create(Collapsible);

export function Workspace({
    isCollapse,
    setCollapse,
}: {
    isCollapse: boolean;
    setCollapse: Dispatch<SetStateAction<boolean>>;
}) {
    const { openModal } = useModal();
    const [isEditing, setIsEditing] = useState<string>("");
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
                <Plus
                    size={14}
                    onClick={(e) => {
                        e.stopPropagation();
                        openModal("new-collections");
                    }}
                />
            </CollapsibleTrigger>

            {/* Projects List */}
            {!isCollapse &&
                collectionsTree.map((project, index) => {
                    const handleBlur = () => setIsEditing("");
                    const enterKey = (event) => {
                        if (event.key === "Enter") setIsEditing("");
                    };

                    return (
                        <CollapsibleContent key={project.id}>
                            <MotionCollapse
                                initial={{ y: -5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <CollapsibleTrigger className="group transition-all px-2 rounded-lg flex justify-between w-full">
                                    <div className="flex gap-1 justify-center p-2 ml-4">
                                        <File
                                            size={14}
                                            style={{
                                                color: `${project.collectionsTheme}`,
                                            }}
                                        />

                                        {isEditing === project.id ? (
                                            <input
                                                type="text"
                                                className="text-[14px] max-w-20"
                                                onKeyDown={enterKey}
                                                value={project.collectionName}
                                                onChange={(e) =>
                                                    db.collections.update(
                                                        project.id,
                                                        {
                                                            collectionName:
                                                                e.target.value,
                                                        },
                                                    )
                                                }
                                                onBlur={handleBlur}
                                                autoFocus
                                            />
                                        ) : (
                                            <h1
                                                onDoubleClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setIsEditing(project.id);
                                                }}
                                                style={{
                                                    color: `${project.collectionsTheme}`,
                                                }}
                                                className="text-[14px] w-20 truncate text-left"
                                            >
                                                {project.collectionName}
                                            </h1>
                                        )}
                                    </div>
                                    <DropdownWorkspace id={project.id} />
                                </CollapsibleTrigger>

                                {/* Project children list */}
                                <CollapsibleContent className="space-y-2 ml-4">
                                    {project.project.map((file) => (
                                        <MotionCollapse
                                            key={file.id}
                                            initial={{ y: -5, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -5, opacity: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group transition-all"
                                        >
                                            <NavLink
                                                key={file.id}
                                                to={`/project/${file.id}`}
                                                className={({ isActive }) =>
                                                    `text-[12px] ml-12  ${isActive ? "underline font-semibold" : null} flex justify-between items-center `
                                                }
                                            >
                                                <p>{file.projectName}</p>
                                                <button
                                                    className="hidden group-hover:block rounded-full"
                                                    onClick={() =>
                                                        openModal(
                                                            "project",
                                                            file.id,
                                                        )
                                                    }
                                                >
                                                    <Minus size={13} />
                                                </button>
                                            </NavLink>
                                        </MotionCollapse>
                                    ))}
                                </CollapsibleContent>
                            </MotionCollapse>
                        </CollapsibleContent>
                    );
                })}
        </Collapsible>
    );
}

function DropdownWorkspace({ id }: { id: string }) {
    const { openModal } = useModal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={13} />
                    </button>
                }
            />
            <DropdownMenuContent className="bg-bg-secondary ring-0 text-txt-primary">
                <DropdownMenuItem className="hover:bg-bg-primary">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal("new-project", id);
                        }}
                        className="flex gap-2 w-full"
                    >
                        <Plus size={13} />
                        <span className="text-[13px]">Create</span>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-bg-primary">
                    <button
                        onClick={() => openModal("workspace", id)}
                        className="flex gap-2 w-full text-red-500"
                    >
                        <Trash size={13} />
                        <span className="text-[13px]">Delete</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
