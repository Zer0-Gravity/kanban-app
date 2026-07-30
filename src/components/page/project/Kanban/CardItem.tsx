import { CalendarFold, Clock, MoreHorizontal } from "lucide-react";
import type { Card } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";
import { intervalToDuration } from "date-fns";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import PriorityTags from "../../utilityComponent/PriorityTags";
import { durationLeft, urgent } from "../../../../utils";

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

    const tags = useLiveQuery(() =>
        db.tag.where("id").equals(card.tagId).first(),
    );

    const deadlineDuration = intervalToDuration({
        start: new Date(),
        end: card.deadlineDate,
    });

    //Flag for the card nearing deadline or already pass the deadline
    const { isUrgent } = urgent(deadlineDuration);

    if (!tags) return;

    return (
        <Link
            to={`detail/${card.id}`}
            ref={ref}
            className={`rounded-lg p-3 w-62.5 space-y-2 bg-white ${isDragging && "opacity-50"} ${isUrgent && "border-2 border-red-500"}`}
        >
            <div className="flex justify-between">
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
                <MoreHorizontal size={14} />
            </div>
            <p className="text-[14px] font-semibold mt-3 truncate">
                {card.cardName}
            </p>
            <p className="truncate text-sm text-[12px]">
                {card.description || "No Description"}
            </p>
            <div className="h-2 w-full bg-gray-300 rounded-full">
                <div
                    style={{ backgroundColor: tags.tagColor }}
                    className="h-2 w-[20%] rounded-full"
                ></div>
            </div>
            <p className="flex justify-end text-[12px]">Progress 4/7</p>
            <div
                className={`flex gap-2 items-center ${isUrgent && "text-red-500"} }`}
            >
                <CalendarFold size={10} />
                <p className="text-[12px]">{`${durationLeft(deadlineDuration)}`}</p>
            </div>
        </Link>
    );
}

export default CardItem;
