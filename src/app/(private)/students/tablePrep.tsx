"use client"
import { Student } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react"
import { SortButton } from "../exams/examTable";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tanStackTable";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const StudentTable = ({ data }: { data: Student[] }) => {
    const StudentColumn: ColumnDef<Student>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => <SortButton name="Name" column={column} />,
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entry.name)}>
                                Copy name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSeparator />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={async () => {
                                    const supabase = createClient();
                                    const { error } = await supabase
                                        .from('Students')
                                        .delete()
                                        .eq('id', entry.id)
                                    if (!error)
                                        toast({
                                            title: "Entry Deleted. Please Refresh to see changes",
                                        })
                                }}
                            >
                                Delete user
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );

            }
        }

    ]
    return (
        <DataTable filter="name" columns={StudentColumn} data={data} />
    )
};

export default StudentTable;