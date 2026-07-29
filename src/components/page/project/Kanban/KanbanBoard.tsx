import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import { Plus } from "lucide-react";
import { useModal } from "../../../../store";
import { db } from "../../../../db";
import { move } from "@dnd-kit/helpers";
import { useEffect, useRef, useState } from "react";
import type { Card, Columns } from "../../../../type";
import { useLiveQuery } from "dexie-react-hooks";

function KanbanBoard({ activeProject }: { activeProject: string }) {
    const { openModal } = useModal();

    //Make temporary state local management
    const [columns, setColumns] = useState<Columns[]>([]);
    const [cardByColumn, setCardByColumn] = useState<Record<string, Card[]>>(
        {},
    );

    const isDragging = useRef(false);

    const [active, setActive] = useState<{
        id: string;
        type: "column" | "card";
    } | null>(null);

    const dbData = useLiveQuery(async () => {
        const [cols, cards] = await Promise.all([
            db.columns.where("projectId").equals(activeProject).sortBy("order"),
            db.cards.toArray(),
        ]);

        const grouped: Record<string, Card[]> = {};

        //Seed empty card without array first giving column that have zero card a key
        for (const col of cols) {
            grouped[col.id] = [];
        }

        //Distribute every card into their respective column
        for (const card of cards) {
            (grouped[card.columnId] ??= []).push(card);
        }

        //Short column based on their order
        for (const columnId in grouped) {
            grouped[columnId].sort((a, b) => a.order - b.order);
        }

        return { cols, grouped };
    }, [activeProject]);

    useEffect(() => {
        if (dbData && !isDragging.current) {
            setColumns(dbData.cols);
            setCardByColumn(dbData.grouped);
        }
    }, [dbData]);

    //Function helper for updating the order of the column into the database using bulkPut from dexie
    async function updateColumnOrder(next: Columns[]) {
        await db.columns.bulkPut(
            next.map((col, index) => ({ ...col, order: index })),
        );
    }

    //Function helper for updating card
    async function updateCardPlacement(next: Record<string, Card[]>) {
        const updates: Card[] = [];

        for (const columnId in next) {
            next[columnId].forEach((card, index) => {
                //Update order of the column inside the column in
                //and update newly dragged card into column
                updates.push({ ...card, columnId, order: index });
            });
        }
        await db.cards.bulkPut(updates);
    }

    return (
        <main className="flex flex-col gap-4 h-full overflow-hidden">
            <DragDropProvider
                onDragStart={(event) => {
                    const { source } = event.operation;
                    isDragging.current = true;

                    setActive({
                        id: source.id as string,
                        type: source.type as "column" | "card",
                    });
                }}
                onDragOver={(event) => {
                    const { source } = event.operation;

                    if (source?.type === "column") return;

                    //Move the card in to the react state for temporary store
                    setCardByColumn((current) => move(current, event));
                }}
                onDragEnd={(event) => {
                    const { source } = event.operation;

                    if (event.canceled) {
                        return;
                    }

                    if (source?.type === "column") {
                        //Update the column order into the database
                        setColumns((current) => {
                            const next = move(current, event);
                            updateColumnOrder(next);
                            return next;
                        });
                        return;
                    }

                    if (source?.type === "card") {
                        //Update the card from the react state to the database
                        setCardByColumn((current) => {
                            updateCardPlacement(current);
                            return current;
                        });
                    }
                }}
            >
                <div className="flex justify-end">
                    <button
                        onClick={() => openModal("new-board", activeProject)}
                        className="bg-gray-200 p-2 rounded-lg flex gap-2 items-center"
                    >
                        <Plus size={14} />
                        <span className="text-[14px] font-medium">Column</span>
                    </button>
                </div>

                <div className="flex flex-1 gap-4 py-3 scrollbar-custom min-h-0 overflow-x-auto overflow-y-hidden">
                    {columns.map((col, index) => {
                        return (
                            <KanbanColumn
                                key={col.id}
                                index={index}
                                column={col}
                                cards={cardByColumn[col.id] || []}
                            />
                        );
                    })}
                </div>

                <DragOverlay>
                    {active
                        ? (active.type === "column" && (
                              <div>
                                  <p>Dragging column</p>
                                  <p>
                                      {
                                          columns.find(
                                              (col) => col.id === active.id,
                                          ).columnName
                                      }
                                  </p>
                              </div>
                          )) ||
                          (active.type === "card" && (
                              <div>
                                  <p>Dragging Card</p>
                                  <p>
                                      {
                                          Object.values(cardByColumn)
                                              .flat()
                                              .find(
                                                  (card) =>
                                                      card.id === active.id,
                                              ).cardName
                                      }
                                  </p>
                              </div>
                          ))
                        : null}
                </DragOverlay>
            </DragDropProvider>
        </main>
    );
}

export default KanbanBoard;
