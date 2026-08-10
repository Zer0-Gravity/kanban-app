import {
    MoreHorizontal,
    PackageOpen,
    Pencil,
    Plus,
    Tags,
    Trash,
} from "lucide-react";
import Button from "../utilityComponent/Button";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";

import { useState } from "react";
import { useModal } from "../../../store";
import type { Tag } from "../../../type";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import DropdownTable from "./DropdownTable";

async function deleteTag(id: string) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const columns: ColumnDef<Tag>[] = [
    {
        id: "number",
        header: () => <span>No</span>,
        cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
        accessorKey: "tagName",
        header: () => <span>Tag Name</span>,
    },
    {
        accessorKey: "color",
        header: () => <span>Color</span>,
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `${row.original.tagColor}` }}
                />
                <span style={{ color: row.original.tagColor }}>
                    {row.original.tagColor}
                </span>
            </div>
        ),
    },
    {
        id: "action",
        header: () => <span>Action</span>,
        cell: ({ row }) => <DropdownTable tagId={row.original.id} />,
    },
];

function ManageTag() {
    const [filterData, setFilterData] = useState<ColumnFiltersState>([]);
    const { openModal } = useModal();

    const data = useLiveQuery(() => db.tag.toArray());

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setFilterData,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters: filterData,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (!data) return;
    return (
        <main className="h-full w-full md:w-175 gap-5 flex flex-col text-txt-primary ">
            <header className="space-y-3 mt-10">
                <div className="flex gap-3 items-center">
                    <h1 className="font-bold text-[50px]">Manage Tag</h1>
                    <Tags size={40} />
                </div>
                <p className="max-w-150 text-[14px]">
                    Give your projects some color! Manage your global tags here
                    to easily categorize your workflow
                </p>
            </header>

            <div className="flex justify-between">
                <input
                    type="text"
                    className="rounded-full border py-2 px-4 w-75"
                    placeholder="Search tag..."
                    value={
                        (table
                            .getColumn("tagName")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) =>
                        table
                            .getColumn("tagName")
                            ?.setFilterValue(e.target.value)
                    }
                />
                <Button
                    icon={Plus}
                    customClass="text-button"
                    onClick={() => openModal("new-tag")}
                >
                    New Tag
                </Button>
            </div>

            <div className="space-y-3">
                <Table className="">
                    <TableHeader>
                        {table.getHeaderGroups().map((headGroup) => (
                            <TableRow key={headGroup.id}>
                                {headGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length !== 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={row.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <div className="flex gap-3 border p-5 rounded-lg items-center justify-center">
                                        <PackageOpen size={25} />
                                        <span>
                                            no matching tag is found, create new
                                            one and start using it!
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="py-1 px-2 rounded-lg border-2 text-sm disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="py-1 px-2 rounded-lg border-2 text-sm disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
}

export default ManageTag;
