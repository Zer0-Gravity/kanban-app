import { useState } from "react";
import { db } from "../../../db";
import { CalendarFold } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { format, formatDistanceToNow } from "date-fns";
import { Separator } from "../../ui/separator";

function OverviewPage({
    descriptions,
    id,
}: {
    descriptions: string;
    id: string;
}) {
    const [desc, setDesc] = useState<string>(descriptions || "No descriptions");

    const dbData = useLiveQuery(() => db.projects.get(id));

    //Function to update the descriptions
    async function handleUpdateDesc() {
        try {
            await db.projects.update(id, { description: desc });
        } catch (error) {
            console.log(error);
        }
    }

    if (!dbData) return;

    return (
        <div className="w-full h-full p-5 space-y-3">
            <h1 className="text-[20px] font-semibold text-left">
                About this project
            </h1>

            <Separator className="bg-divider" />

            <div>
                <p className="flex gap-2 items-center text-[14px]">
                    <CalendarFold size={16} />
                    <span>{`Created at ${format(dbData.createdAt, "PPP")} (${formatDistanceToNow(dbData.createdAt, { addSuffix: true })})`}</span>
                </p>
            </div>

            <textarea
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 h-70 bg-bg-secondary text-txt-primary rounded-lg outline-none"
            />

            <button
                onClick={handleUpdateDesc}
                disabled={desc === descriptions}
                className="p-2 bg-button rounded-lg text-white disabled:opacity-50"
            >
                Save changes
            </button>
        </div>
    );
}

export default OverviewPage;
