"use client"

import {getOrdinalSuffix} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { ResultEntry } from "@/lib/types";

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
  }
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },

]
