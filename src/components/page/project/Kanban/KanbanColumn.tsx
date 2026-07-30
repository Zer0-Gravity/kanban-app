import { Minus, Plus } from "lucide-react";
import CardItem from "./CardItem";
import type { Card, Columns } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useModal } from "../../../../store";
import { db } from "../../../../db";

interface KanbanColumnType {
    column: Columns;
    index: number;
    cards: Card[];
}

function KanbanColumn({ cards, column, index }: KanbanColumnType) {
    const { ref, isDragging } = useSortable({
        id: column.id,
        index,
        type: "column",
        accept: ["column", "card"],
        collisionPriority: CollisionPriority.Low,
    });

    const { openModal } = useModal();

    const cardCount = cards.length;

    async function handleColumnDelete() {
        try {
            const cardId = cards.map((c) => c.id);

            //Delete column and its card content and each individual task list of the card
            await Promise.all([
                db.columns.delete(column.id),
                db.cards.where("columnId").equals(column.id).delete(),
                db.task.where("cardId").anyOf(cardId).delete(),
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            ref={ref}
            className={`bg-gray-200 w-67.5 shrink-0 flex flex-col h-fit max-h-full rounded-xl ${isDragging ? "opacity-50 border border-button" : null}`}
        >
            <div
                style={{
                    backgroundColor: `${column.columnTheme}40`,
                }}
                className="flex justify-between rounded-t-xl p-2 h-12.5"
            >
                <div className="flex items-center gap-3">
                    <p
                        className="h-5 w-5 rounded-full"
                        style={{ backgroundColor: column.columnTheme }}
                    ></p>
                    <p className="font-semibold text-[13px]">
                        {column.columnName}
                    </p>
                    <p className="text-[12px] font-bold bg-white w-5 h-5 flex items-center justify-center rounded-full">
                        {cardCount}
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <button onClick={() => openModal("new-card", column.id)}>
                        <Plus size={14} />
                    </button>
                    <button onClick={handleColumnDelete}>
                        <Minus size={14} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col scrollbar-none gap-3 py-3 flex-1 overflow-y-auto min-h-0 items-center">
                {cards.map((card, index) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        index={index}
                        columnId={column.id}
                    />
                ))}
                {cards.length === 0 && (
                    <p className="text-sm p-5 text-center w-62.5 border rounded-lg text-foreground-muted-primary">
                        Make or drag a card here
                    </p>
                )}
            </div>
        </div>
    );
}

export default KanbanColumn;
