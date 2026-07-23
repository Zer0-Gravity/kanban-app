import { MoreHorizontal } from "lucide-react";
import CardItem from "./CardItem";
import type { Card, Columns } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";

interface KanbanColumnType {
    column: Columns;
    index: number;
    cards: Card[];
}

function KanbanColumn({ cards, column, index }: KanbanColumnType) {
    const { ref, isDragging } = useSortable({ id: column.id, index });

    const cardCount = cards.length;

    return (
        <div
            ref={ref}
            className={`bg-gray-200 min-w-87.5 h-fit p-3 rounded-xl select-none ${isDragging ? "opacity-80 border border-button" : null}`}
        >
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-3">
                    <p
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: column.columnTheme }}
                    ></p>
                    <p className="font-semibold">{column.columnName}</p>
                    <p className="text-foreground-muted-primary font-bold">
                        {cardCount}
                    </p>
                </div>
                <button>
                    <MoreHorizontal />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {cards.length !== 0 ? (
                    cards.map((card, index) => (
                        <CardItem key={card.id} card={card} index={index} />
                    ))
                ) : (
                    <p className="text-sm p-5 text-center border rounded-lg text-foreground-muted-primary">
                        Make or drag a card here
                    </p>
                )}
            </div>
        </div>
    );
}

export default KanbanColumn;
