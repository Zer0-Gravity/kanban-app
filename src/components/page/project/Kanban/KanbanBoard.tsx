import { DragDropProvider } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import { Plus } from "lucide-react";
import { useModal } from "../../../../store";
import { db } from "../../../../db";
import { move } from "@dnd-kit/helpers";
import { useEffect, useRef, useState } from "react";
import type { Card, Columns } from "../../../../type";

function KanbanBoard({ activeProject }: { activeProject: string }) {
    const { openModal } = useModal();
    const [columns, setColumns] = useState<Columns[]>([]);
    const [cardByColumn, setCardByColumn] = useState<Record<string, Card[]>>(
        {},
    );

    // Snapshot of card state, taken right when a drag starts. If the user
    // cancels mid-drag (Escape key, invalid drop), we roll back to this
    // instead of whatever half-finished state onDragOver left behind.
    const cardsSnapshot = useRef<Record<string, Card[]>>({});

    useEffect(() => {
        Promise.all([
            db.columns.where("projectId").equals(activeProject).sortBy("order"),
            db.cards.toArray(),
        ]).then(([cols, cards]) => {
            const grouped: Record<string, Card[]> = {};

            // Seed EVERY column with an empty array first — this is the fix.
            // Without this line, a column with zero cards has no key at all
            // in `grouped`, so dropping a card onto it during a drag has
            // nowhere to land.
            for (const col of cols) {
                grouped[col.id] = [];
            }

            for (const card of cards) {
                (grouped[card.columnId] ??= []).push(card);
            }
            for (const columnId in grouped) {
                grouped[columnId].sort((a, b) => a.order - b.order);
            }

            setColumns(cols);
            setCardByColumn(grouped);
        });
    }, [activeProject]);

    // ---------------------------------------------------------------------
    // PERSIST HELPERS — write the current in-memory positions to Dexie.
    // `bulkPut` upserts every row in one transaction, matched by primary key.
    // ---------------------------------------------------------------------
    async function persistColumnOrder(next: Columns[]) {
        await db.columns.bulkPut(
            next.map((col, index) => ({ ...col, order: index })),
        );
    }

    async function persistCardOrder(next: Record<string, Card[]>) {
        const updates: Card[] = [];
        for (const columnId in next) {
            next[columnId].forEach((card, index) => {
                // Rewrite BOTH `order` (position within the column) and
                // `columnId` (which column it's in) — a card that moved
                // across columns needs both updated, not just its order.
                updates.push({ ...card, columnId, order: index });
            });
        }
        await db.cards.bulkPut(updates);
    }

    return (
        <>
            <DragDropProvider
                onDragStart={() => {
                    cardsSnapshot.current = cardByColumn;
                }}
                onDragOver={(event) => {
                    const { source } = event.operation;
                    if (source?.type === "column") return;
                    setCardByColumn((current) => move(current, event));
                }}
                onDragEnd={(event) => {
                    const { source } = event.operation;

                    if (event.canceled) {
                        // Drag was aborted — undo whatever onDragOver did,
                        // and don't write anything to Dexie.
                        if (source?.type === "card") {
                            setCardByColumn(cardsSnapshot.current);
                        }
                        return;
                    }

                    if (source?.type === "column") {
                        setColumns((current) => {
                            const next = move(current, event);
                            persistColumnOrder(next);
                            return next;
                        });
                        return;
                    }

                    if (source?.type === "card") {
                        // onDragOver already moved the card in state — we
                        // just need to write the CURRENT state to Dexie.
                        setCardByColumn((current) => {
                            persistCardOrder(current);
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
            </DragDropProvider>
        </>
    );
}

export default KanbanBoard;
