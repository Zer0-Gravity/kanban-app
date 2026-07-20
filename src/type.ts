export interface Collections {
    id: string;
    collectionName: string;
    collectionsTheme?: string;
    createdAt: string;
}

export interface Projects {
    id: string;
    collectionsId: string;
    projectName: string;
    description: string;
    createdAt: string;
}

export interface Columns {
    id: string;
    projectId: string;
    columnName: string;
    columnTheme: string;
    createdAt: string;
}

export interface Card {
    id: string;
    columnId: string;
    cardName: string;
    deadlineDate: string;
    description: string;
    priority: Priority;
}

export interface Task {
    id: string;
    cardId: string;
    taskName: string;
}

export interface Tag {
    id: string;
    tagName: string;
}

type Priority = "High" | "Medium" | "Low";
