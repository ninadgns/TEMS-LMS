"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tanStackTable";
import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table"
import { ExamInfo, ResultEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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

const ExamTable = ({ hehe, handleRefresh }: { hehe: number, handleRefresh: () => void }) => {
    const supabase = createClient();
    const router = useRouter();


    const [exams, setExams] = useState<ExamInfo[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            let { data: Exams, error } = await supabase
                .from('Exams')
                .select('*')

            if (error) {
                console.log(error);
            }

            console.log(Exams)
            if (Exams)
                setExams(Exams.map(exam => ({
                    ...exam, date: new Date(exam.date)
                })))

        }

        fetchData();
    }, [hehe]); 

    const ExamColumns: ColumnDef<ExamInfo>[] = [
        {
            accessorKey: "batchName",
            header: ({ column }) => <SortButton name="Batch Name" column={column} />,
        },
        {
            accessorKey: "date",
            header: ({ column }) => <SortButton name="Date" column={column} />,
            cell: ({ row }) => {
                return row.original.date.toUTCString().slice(0, 16)
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
                    <Button onClick={() => { console.log("lets go"); router.push(`/exams/${entry.id}`) }}>View Details</Button>

                )
            }
        }

    ]


    return (
        <DataTable columns={ExamColumns} data={exams} handleRefresh={handleRefresh} />
    )
};

export default ExamTable;
