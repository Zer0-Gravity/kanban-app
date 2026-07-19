import { Dexie, type EntityTable } from "dexie";

interface Collections {
    id: string;
    collectionName: string;
    collectionsTheme?: string;
    createdAt: string;
}

interface Projects {
    id: string;
    collectionsId: string;
    projectName: string;
    description: string;
    createdAt: string;
}

interface Columns {
    id: string;
    projectId: string;
    columnName: string;
    columnTheme: string;
    createdAt: string;
}

interface Card {
    id: string;
    columnId: string;
    cardName: string;
    deadlineDate: string;
    description: string;
    priority: Priority;
}

interface Task {
    id: string;
    cardId: string;
    taskName: string;
}

interface Tag {
    id: string;
    tagName: string;
}

type Priority = "High" | "Medium" | "Low";

export const db = new Dexie("kanbanDatabase") as Dexie & {
    collections: EntityTable<Collections, "id">;
    projects: EntityTable<Projects, "id">;
    columns: EntityTable<Columns, "id">;
    cards: EntityTable<Card, "id">;
    task: EntityTable<Task, "id">;
    tag: EntityTable<Tag, "id">;
};

db.version(1).stores({
    collections: "id",
    projects: "id, collectionsId",
    columns: "id, projectId",
    cards: "id, columnId",
    task: "id, cardId",
    tag: "id",
})
