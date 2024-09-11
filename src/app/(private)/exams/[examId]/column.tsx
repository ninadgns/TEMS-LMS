"use client"
import { getOrdinalSuffix } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { ExamInfo, ResultEntry } from "@/lib/types";
import { SortButton } from "../examTable";
import editEntry from "./editEntry";
import EditEntry from "./editEntry";






export const columns: ColumnDef<ResultEntry>[] = [
  {
    accessorKey: "serial",
    header: ({ column }) => <SortButton name="Sl" column={column} />,
  }, {
    accessorKey: "name",
    header: ({ column }) => <SortButton name="Name" column={column} />,
  },
  {
    accessorKey: "marks",
    header: ({ column }) => <SortButton name="Mark" column={column} />,
  },
  {
    accessorKey: "position",
    header: ({ column }) => <SortButton name="Position" column={column} />,
    cell: ({ row }) => { return row.getValue("position") + getOrdinalSuffix(row.getValue("position")) }
  }, {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <EditEntry row={row} />
  }

]
