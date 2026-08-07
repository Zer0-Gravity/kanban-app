import { CalendarFold, CheckCircle, Clock, Minus } from "lucide-react";
import { DEFAULT_TAG, type Card } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";
import { intervalToDuration } from "date-fns";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import PriorityTags from "../../utilityComponent/PriorityTags";
import { durationLeft, urgent } from "../../../../utils";
import { useModal } from "../../../../store";

interface CardType {
    card: Card;
    index: number;
    columnId: string;
}

function CardItem({ card, index, columnId }: CardType) {
    const { ref, isDragging } = useSortable({
        id: card.id,
        index,
        group: columnId,
        type: "card",
        accept: ["card"],
    });

    const { openModal } = useModal();
    const tags = useLiveQuery(() => {
        if (card.tagId === "default") return DEFAULT_TAG;

        return db.tag.get(card.tagId);
    });

    const deadlineDuration = intervalToDuration({
        start: new Date(),
        end: card.deadlineDate,
    });

    //Flag for the card nearing deadline or already pass the deadline
    const { isUrgent } = urgent(deadlineDuration);

    const dbTask = useLiveQuery(async () => {
        const taskList = await db.task
            .where("cardId")
            .equals(card.id)
            .toArray();

        //Get all total task that available on each  card
        const total = taskList.length;

        if (total === 0) {
            return { total: 0, status: 0, current: 0 };
        }

        //Get the total task that flagged as done
        const current = taskList.filter((task) => task.done === true).length;

        //Calculate the for the width
        const status = Math.round((current / total) * 100);

        return { total, status, current };
    }, [card.id]);

    const { total, status, current } = dbTask ?? {};

    if (!tags) return;

    return (
        <Link
            to={`detail/${card.id}`}
            ref={ref}
            className={`rounded-lg p-3 w-62.5 space-y-2 bg-bg-primary shadow-md ${isDragging && "opacity-50"} ${isUrgent && "border-2 border-red-500"}`}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <p
                        style={{
                            color: tags.tagColor,
                            backgroundColor: `rgb(from ${tags.tagColor} r g b / 15%)`,
                        }}
                        className="py-1 px-2 text-[12px] rounded-lg font-semibold"
                    >
                        {tags.tagName}
                    </p>
                    <PriorityTags>{card.priority}</PriorityTags>
                </div>
                {isUrgent && <Clock size={14} color="red" />}
                <button
                    className="active:scale-90 p-0.5 hover:bg-slate-500 rounded-full h-fit"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal("card", card.id);
                    }}
                >
                    <Minus size={14} />
                </button>
            </div>
            <p className="text-[14px] font-semibold mt-3 truncate">
                {card.cardName}
            </p>
            <p className="truncate text-sm text-[12px] text-txt-secondary">
                {card.description || "No Description"}
            </p>
            <div className="h-2 w-full bg-bg-secondary rounded-full">
                <div
                    style={{
                        backgroundColor: tags.tagColor,
                        width: `${status}%`,
                    }}
                    className={`h-2 rounded-full`}
                />
            </div>

            {total !== 0 && current !== total && (
                <p className="flex justify-end text-[12px]">
                    Progress {current}/{total}
                </p>
            )}

            {total === 0 && (
                <p className="flex justify-end text-[12px]">No task yet</p>
            )}

            {current === total && total !== 0 && (
                <div className="flex justify-end text-[12px] gap-2 items-center text-green-600">
                    <CheckCircle size={12} />
                    <p>Done</p>
                </div>
            )}
            <div
                className={`flex gap-2 items-center ${isUrgent && "text-red-500"} }`}
            >
                <CalendarFold size={14} className="text-txt-secondary" />
                <p className="text-[12px] text-txt-secondary">{`${durationLeft(deadlineDuration)}`}</p>
            </div>
        </Link>
    );
}

export default CardItem;
