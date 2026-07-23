import { Dexie, type EntityTable } from "dexie";
import type { Card, Collections, Columns, Projects, Tag, Task } from "./type";

export const db = new Dexie("kanbanDatabase") as Dexie & {
    collections: EntityTable<Collections, "id">;
    projects: EntityTable<Projects, "id">;
    columns: EntityTable<Columns, "id">;
    cards: EntityTable<Card, "id">;
    task: EntityTable<Task, "id">;
    tag: EntityTable<Tag, "id">;
};

db.version(12).stores({
    collections: "id",
    projects: "id, collectionsId",
    columns: "id, projectId",
    cards: "id, columnId, tagId",
    task: "id, cardId",
    tag: "id",
});
