import { DragDropProvider } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import { Plus } from "lucide-react";
import { useModal } from "../../../../store";
import { db } from "../../../../db";
import { useLiveQuery } from "dexie-react-hooks";

function KanbanBoard({ activeProject }: { activeProject: string }) {
    const { openModal } = useModal();

    const dbCard = useLiveQuery(() => db.cards.toArray());
    const dbColumn = useLiveQuery(() =>
        db.columns.where("projectId").equals(activeProject).toArray(),
    );

    if (!dbColumn) return;

    return (
        <>
            <DragDropProvider>
                <div className="flex-1 min-h-0">
                    <div className="flex items-start gap-4 overflow-auto py-3 w-full h-full scrollbar-custom">
                        {dbColumn.map((col, index) => {
                            //Filter down cards belonging strictly to each column
                            const cards = dbCard.filter(
                                (card) => card.columnId === col.id,
                            );

                            return (
                                <KanbanColumn
                                    key={col.id}
                                    index={index}
                                    column={col}
                                    cards={cards}
                                />
                            );
                        })}

                        <button
                            onClick={() =>
                                openModal("new-board", activeProject)
                            }
                            className="bg-gray-200 p-2 rounded-lg"
                        >
                            <Plus />
                        </button>
                    </div>
                </div>
            </DragDropProvider>
        </>
    );
}

export default KanbanBoard;
