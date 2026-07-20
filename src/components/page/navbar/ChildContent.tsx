import { Folder } from "lucide-react";
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

function ChildContent() {
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

    return (
        <CollapsibleContent>
            <SidebarGroupContent>
                <SidebarMenuSub>
                    {collectionsTree.map((col) => (
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
                                        {col.project.map((project) => (
                                            <SidebarMenuSubItem
                                                key={project.id}
                                            >
                                                <SidebarMenuSubButton className="hover:bg-amber-200 select-none">
                                                    {project.projectName}
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenuSub>
            </SidebarGroupContent>
        </CollapsibleContent>
    );
}

export default ChildContent;
