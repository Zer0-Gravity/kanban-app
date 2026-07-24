import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import { Plus } from "lucide-react";
import { useModal } from "../../../../store";
import { db } from "../../../../db";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";
import type { Card, Columns } from "../../../../type";

function KanbanBoard({ activeProject }: { activeProject: string }) {
    const { openModal } = useModal();

    //Make temporary state local management
    const [columns, setColumns] = useState<Columns[]>([]);
    const [cardByColumn, setCardByColumn] = useState<Record<string, Card[]>>(
        {},
    );

    const [active, setActive] = useState<{
        id: string;
        type: "column" | "card";
    } | null>(null);

    useEffect(() => {
        Promise.all([
            db.columns.where("projectId").equals(activeProject).sortBy("order"),
            db.cards.toArray(),
        ]).then(([cols, cards]) => {
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

            setColumns(cols);
            setCardByColumn(grouped);
        });
    }, [activeProject]);

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

    console.log(active);

    return (
        <>
            <DragDropProvider
                onDragStart={(event) => {
                    const { source } = event.operation;

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
                <div className="flex-1 min-h-0">
                    <div className="flex items-start gap-4 overflow-auto py-3 w-full h-full scrollbar-custom">
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
        </>
    );
}

export default KanbanBoard;
