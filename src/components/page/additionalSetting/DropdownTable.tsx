import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useModal } from "../../../store";

function DropdownTable({ tagId }: { tagId: string }) {
    const { openModal } = useModal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-bg-primary text-primary ring-0!">
                <DropdownMenuGroup className="space-y-3">
                    <DropdownMenuItem className="hover:bg-bg-secondary">
                        <Pencil />
                        <span>Update</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-400 hover:bg-bg-secondary"
                        onClick={() => openModal("tag", tagId)}
                    >
                        <Trash />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropdownTable;
