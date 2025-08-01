"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "@/components/tanStackTable";
import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table"
import { ExamInfo, ExamTypeDB, ResultEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const SortButton = ({ name, column }: { name: string, column: any }) => {
    return <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {name}
        <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
}

const ExamTable = ({ ExamData }: { ExamData: ExamTypeDB[] }) => {
    const supabase = createClient();
    const router = useRouter();




    const ExamColumns: ColumnDef<ExamTypeDB>[] = [
        {
            accessorKey: "batchName",
            header: ({ column }) => <SortButton name="Batch Name" column={column} />,
        },
        {
            accessorKey: "date",
            header: ({ column }) => <SortButton name="Date" column={column} />,
            cell: ({ row }) => {
                return new Date(row.original.date).toUTCString().slice(0, 16)
            }
        },
        {
            accessorKey: "topic",
            header: ({ column }) => <SortButton name="Topic" column={column} />,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                var entry = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { console.log("lets go"); router.push(`/exams/${entry.id}`) }}>
                                View Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );

            }
        }

    ]
    return (
        <DataTable filter="batchName" columns={ExamColumns} data={ExamData} />
    )
};

export default ExamTable;
