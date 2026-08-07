import {
    CalendarFold,
    CopyCheck,
    Edit,
    Flag,
    Minus,
    Plus,
    TextInitial,
    Trash,
} from "lucide-react";
import { useModal } from "../../../store";
import Button from "../utilityComponent/Button";
import { Checkbox } from "../../ui/checkbox";
import { useNavigate, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import { useSortable } from "@dnd-kit/react/sortable";
import { format, intervalToDuration } from "date-fns";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { DEFAULT_TAG, type Task } from "../../../type";
import { move } from "@dnd-kit/helpers";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Separator } from "@base-ui/react";
import { PriorityDetail } from "../utilityComponent/PriorityTags";
import { useRef } from "react";
import { durationLeft, urgent } from "../../../utils";

function DetailProject() {
    const { openModal } = useModal();
    const navigate = useNavigate();

    const { projectId, cardId } = useParams();
    const titleRef = useRef(null);

    //Call both tags and card in the same variable
    const dbData = useLiveQuery(async () => {
        const dbCard = await db.cards.get(cardId);
        const dbTags = await db.tag.where("id").equals(dbCard.tagId).first();

        return { ...dbCard, tag: dbTags || DEFAULT_TAG };
    }, [cardId]);

    const taskList =
        useLiveQuery(
            () => db.task.where("cardId").equals(cardId).sortBy("order"),
            [cardId],
        ) ?? [];

    //Helper to save the new ordered task
    async function updateTaskOrder(next: Task[]) {
        await db.task.bulkPut(
            next.map((task, index) => ({ ...task, order: index })),
        );
    }

    if (!dbData) return;

    //Count the deadline duration
    const deadlineDuration = intervalToDuration({
        start: new Date(),
        end: dbData.deadlineDate,
    });

    //function for drawer close
    function handleClose() {
        navigate(`/project/${projectId}`);
    }

    //function to delete the card alongside its task
    async function handleDelete() {
        try {
            Promise.all([
                db.cards.delete(cardId),
                db.task.where("cardId").equals(cardId).delete(),
            ]);

            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const { isUrgent } = urgent(deadlineDuration);
    return (
        <Sheet
            open={true}
            onOpenChange={(open) => {
                if (!open) {
                    handleClose();
                }
            }}
        >
            <SheetContent className="w-112.5! sm:max-w-none! p-3! bg-bg-secondary rounded-xl border-none text-txt-primary">
                <SheetHeader className="p-0">
                    <SheetTitle className="flex items-center">
                        <input
                            ref={titleRef}
                            type="text"
                            value={dbData.cardName}
                            className="text-[30px] outline-none w-70 pointer-events-none cursor-default caret-amber-400 font-bold"
                            onChange={(e) =>
                                db.cards.update(cardId, {
                                    cardName: e.target.value,
                                })
                            }
                        />
                        <div className="flex gap-2">
                            <Edit
                                size={14}
                                onClick={() => titleRef.current.focus()}
                            />
                            <Trash size={14} onClick={handleDelete} />
                        </div>
                    </SheetTitle>
                </SheetHeader>

                <div>
                    <p className="flex gap-3 items-center ">
                        <CalendarFold size={14} />
                        <span className="text-[12px]">{`Created ${format(dbData.createdAt, "PPP")}`}</span>
                    </p>
                    <div className="flex justify-between">
                        <p
                            className={`flex gap-3 items-center ${isUrgent && "text-red-500"}`}
                        >
                            <Flag size={14} />

                            {/* Format the deadline day duration using date-fns library display it to hours and days */}
                            <span className="text-[12px]">{`${durationLeft(deadlineDuration)}`}</span>
                        </p>

                        <div className="flex gap-2">
                            <p className="text-[12px] flex gap-2">
                                Priority :{" "}
                                <PriorityDetail>
                                    {dbData.priority}
                                </PriorityDetail>
                            </p>
                            <p className="text-[12px] flex gap-2">
                                Tag:{" "}
                                <span
                                    style={{ color: dbData.tag.tagColor }}
                                    className="font-semibold"
                                >
                                    {dbData.tag.tagName}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="bg-black w-full h-0.5" />

                {/* Description */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                        <TextInitial size={16} />
                        <p className="font-semibold">Description</p>
                    </div>
                    <textarea
                        className="h-70 border w-full p-2 rounded-lg outline-none"
                        value={dbData.description}
                        onChange={(e) =>
                            db.cards.update(cardId, {
                                description: e.target.value,
                            })
                        }
                    />
                </div>

                {/* Task Section */}
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-end">
                        <div className="flex gap-2">
                            <CopyCheck size={16} />
                            <h1 className="font-bold">Current Task</h1>
                        </div>
                        <Button
                            icon={Plus}
                            onClick={() => openModal("new-task", cardId)}
                        >
                            <p>Task</p>
                        </Button>
                    </div>

                    <DragDropProvider
                        onDragEnd={(event) => {
                            const next = move(taskList, event);
                            updateTaskOrder(next);
                        }}
                    >
                        <div className="h-100 rounded-lg border p-2 flex-col flex gap-2">
                            {taskList.length !== 0 ? (
                                taskList.map((task, index) => (
                                    <SortableTask
                                        key={task.id}
                                        id={task.id}
                                        index={index}
                                        task={task}
                                    />
                                ))
                            ) : (
                                <p className="w-full text-center p-4 font-medium text-[14px]">
                                    No task currently listed, start creating new
                                    task and track your progress!!
                                </p>
                            )}
                        </div>

                        <DragOverlay>
                            <div className="border-2 border-button bg-bg-primary px-4 py-3 rounded-lg">
                                <p>Dragging task</p>
                            </div>
                        </DragOverlay>
                    </DragDropProvider>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function SortableTask({ id, index, task }) {
    const { ref, isDragging } = useSortable({ id, index });

    //Update the task status and disable checkbox after change
    async function updateCheckbox() {
        try {
            await db.task.update(id, { done: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <label
            ref={ref}
            className={`border h-12 p-2 flex items-center gap-3 rounded-lg has-checked:opacity-70 hover:scale-102 transition-all cursor-grab justify-between ${isDragging && "opacity-50"}`}
        >
            <div className="flex gap-3">
                <Checkbox
                    className="peer rounded-full border-2 border-button data-checked:bg-button size-5 cursor-pointer"
                    onCheckedChange={updateCheckbox}
                    checked={task.done}
                />
                <span className="font-medium select-none peer-data-checked:line-through">
                    {task.taskName}
                </span>
            </div>
            <button onClick={() => db.task.delete(id)}>
                <Minus size={16} />
            </button>
        </label>
    );
}

export default DetailProject;
