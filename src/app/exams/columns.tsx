"use client"

import { getOrdinalSuffix } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { ResultEntry } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.




export const columns: ColumnDef<ResultEntry>[] = [
  {
    accessorKey: "serial",
    header: "Sl",
  }, {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "marks",
    header: "Marks",
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => { return row.getValue("position") + getOrdinalSuffix(row.getValue("position")) }
  }, {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const entry = row.original

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
            <DropdownMenuItem
              onClick={
                () => navigator.clipboard.writeText(entry.name)

              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

]
