export default function PriorityTags({ children }) {
    return (
        <p
            className={`py-1 px-2 text-[12px] rounded-lg font-semibold flex ${(children === "High" && "text-red-500 bg-red-500/20") || (children === "Medium" && "text-amber-500 bg-amber-500/30") || (children === "Low" && "text-blue-500 bg-blue-500/30")}`}
        >
            <span>{children}</span>
        </p>
    );
}

export function PriorityDetail({ children }) {
    return (
        <p
            className={`text-[12px] rounded-lg font-semibold flex ${(children === "High" && "text-red-500 ") || (children === "Medium" && "text-amber-500 ") || (children === "Low" && "text-blue-500")}`}
        >
            <span>{children}</span>
        </p>
    );
}
