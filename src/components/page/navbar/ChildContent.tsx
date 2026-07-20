import { Folder, Plus } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import {
    SidebarGroupContent,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "../../ui/sidebar";
import { db } from "../../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { useModal } from "../../../store";

function ChildContent() {
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
        <CollapsibleContent>
            <SidebarGroupContent>
                <SidebarMenuSub>
                    {collectionsTree.length !== 0 ? (
                        collectionsTree.map((col) => (
                            <Collapsible key={col.id}>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger>
                                        <SidebarMenuButton className="w-full hover:bg-gray-300">
                                            <Folder size={20} />
                                            <span>{col.collectionName}</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {col.project.length !== 0 ? (
                                                col.project.map((project) => (
                                                    <SidebarMenuSubItem
                                                        key={project.id}
                                                    >
                                                        <SidebarMenuSubButton className="hover:bg-amber-200 select-none">
                                                            {
                                                                project.projectName
                                                            }
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))
                                            ) : (
                                                <button
                                                    className="flex text-sm items-center gap-2 cursor-pointer text-button active:scale-98"
                                                    onClick={() =>
                                                        openModal("new-project")
                                                    }
                                                >
                                                    <Plus size={14} />
                                                    <span>Create project</span>
                                                </button>
                                            )}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))
                    ) : (
                        <p className="text-xs p-2">
                            Start creating your project!
                        </p>
                    )}
                </SidebarMenuSub>
            </SidebarGroupContent>
        </CollapsibleContent>
    );
}

export default ChildContent;
