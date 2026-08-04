import { motion } from "motion/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import { useModal } from "../../../store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import type { Dispatch, SetStateAction } from "react";
import {
    File,
    HardDrive,
    Minus,
    MoreHorizontal,
    Pen,
    Plus,
    Trash,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
    const navigate = useNavigate();
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

    async function deleteProject(id: string) {
        try {
            //Wrap everything into transactions
            await db.transaction(
                "rw",
                [db.projects, db.columns, db.cards, db.task],
                async () => {
                    // Get the columns data and id
                    const columns = await db.columns
                        .where("projectId")
                        .equals(id)
                        .toArray();
                    const colId = columns.map((col) => col.id);

                    if (colId.length > 0) {
                        //if column id not empty get the data and id card
                        const cards = await db.cards
                            .where("columnId")
                            .anyOf(colId)
                            .toArray();
                        const cardId = cards.map((card) => card.id);

                        if (cardId.length > 0) {
                            //Get the task data
                            await db.task
                                .where("cardId")
                                .anyOf(cardId)
                                .delete();
                        }

                        //Delete the children data
                        await db.cards.where("columnId").anyOf(colId).delete();
                        await db.columns.where("projectId").equals(id).delete();
                    }

                    //Delete tge parent data
                    await db.projects.delete(id);
                },
            );

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

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
                collectionsTree.map((project, index) => (
                    <CollapsibleContent key={project.id}>
                        <MotionCollapse
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -5, opacity: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CollapsibleTrigger className="group hover:bg-gray-200 transition-all px-2 rounded-lg flex justify-between w-full">
                                <div
                                    style={{
                                        color: `${project.collectionsTheme}`,
                                    }}
                                    className="flex gap-2 items-center p-2 ml-4"
                                >
                                    <File size={14} />
                                    <p className="text-[14px]">
                                        {project.collectionName}
                                    </p>
                                </div>
                                <DropdownWorkspace id={project.id} />
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
                                        className="group flex justify-between items-center transition-all"
                                    >
                                        <NavLink
                                            key={file.id}
                                            to={`/project/${file.id}`}
                                            className={({ isActive }) =>
                                                `text-[14px] ml-12  ${isActive ? "underline font-semibold" : null}`
                                            }
                                        >
                                            {file.projectName}
                                        </NavLink>
                                        <button
                                            className="hidden group-hover:block"
                                            onClick={() =>
                                                deleteProject(file.id)
                                            }
                                        >
                                            <Minus size={13} />
                                        </button>
                                    </MotionCollapse>
                                ))}
                            </CollapsibleContent>
                        </MotionCollapse>
                    </CollapsibleContent>
                ))}
        </Collapsible>
    );
}

function DropdownWorkspace({ id }: { id: string }) {
    const { openModal } = useModal();
    const navigate = useNavigate();

    async function deleteWorkspace() {
        try {
            await db.transaction(
                "rw",
                [db.collections, db.projects, db.columns, db.cards, db.task],
                async () => {
                    //Get the project database and ID
                    const projects = await db.projects
                        .where("collectionsId")
                        .equals(id)
                        .toArray();
                    const proId = projects.map((p) => p.id);

                    if (proId.length > 0) {
                        //Get the columns id and database
                        const columns = await db.columns
                            .where("projectId")
                            .anyOf(proId)
                            .toArray();
                        const colId = columns.map((col) => col.id);

                        if (colId.length > 0) {
                            //Get the card id and database
                            const cards = await db.cards
                                .where("columnId")
                                .anyOf(colId)
                                .toArray();
                            const cardId = cards.map((card) => card.id);

                            if (cardId.length > 0) {
                                //Get the task data
                                await db.task
                                    .where("cardId")
                                    .anyOf(cardId)
                                    .delete();
                            }

                            //Delete the children data
                            await db.cards
                                .where("columnId")
                                .anyOf(colId)
                                .delete();
                            await db.columns
                                .where("projectId")
                                .anyOf(proId)
                                .delete();
                        }

                        await db.projects.where("id").anyOf(proId).delete();
                    }

                    await db.collections.delete(id);
                },
            );

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={13} />
                    </button>
                }
            />
            <DropdownMenuContent className="bg-white ring-0">
                <DropdownMenuItem className="hover:bg-gray-200">
                    <button className="flex gap-2">
                        <Plus size={13} />
                        <span className="text-[13px]">Create</span>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal("new-project", id);
                        }}
                        className="flex gap-2"
                    >
                        <Pen size={13} />
                        <span className="text-[13px]">Rename</span>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200">
                    <button
                        onClick={deleteWorkspace}
                        className="flex gap-2 text-red-500"
                    >
                        <Trash size={13} />
                        <span className="text-[13px]">Delete</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
