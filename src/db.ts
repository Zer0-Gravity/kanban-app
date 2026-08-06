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

//Cascade function delete
db.collections.hook("deleting", function (collectionsId, _obj, transactions) {
    transactions
        .table("projects") //Access the child table of projects table
        .where({ collectionsId: collectionsId }) //get the only table where the collections id matched with id user pass
        .primaryKeys() //Fetch only the matching Ids
        .then(
            (projectIds) =>
                transactions.table("projects").bulkDelete(projectIds), //Receive the array and delete all at once
        );
});

//Projects Cascade and deletes it columns
db.projects.hook("deleting", function (projectId, _obj, transactions) {
    transactions
        .table("columns")
        .where({ projectId: projectId })
        .primaryKeys()
        .then((columnIds) =>
            transactions.table("columns").bulkDelete(columnIds),
        );
});

//Card columns and delete its cards
db.columns.hook("deleting", function (columnId, _obj, transactions) {
    transactions
        .table("cards")
        .where({ columnId: columnId })
        .primaryKeys()
        .then((cardIds) => transactions.table("cards").bulkDelete(cardIds));
});

//Card Cascade and deletes it task
db.cards.hook("deleting", function (cardId, _obj, transactions) {
    transactions.table("task").where({ cardId: cardId }).delete();
});
