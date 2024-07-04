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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";


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
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      var entry = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Name or Marks</DialogTitle>
              <DialogDescription>
                <p className="mb-1">Please click the Update button after pressing Done</p>
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={entry.name}
                  onChange={(e) => entry.name = e.target.value}
                  className="col-span-3"
                />
                <Label htmlFor="marks" className="text-right">
                  Marks
                </Label>
                <Input
                  id="marks"
                  defaultValue={entry.marks}
                  onChange={(e) => entry.marks = parseFloat(e.target.value)}
                  className="col-span-3"
                />
                <Label htmlFor="serial" className="text-right">
                  Serial
                </Label>
                <Input
                  id="serial"
                  defaultValue={entry.serial}
                  onChange={(e) => entry.serial = parseFloat(e.target.value) - .5}
                  className="col-span-3"
                />

                <DialogClose asChild>
=                  <Button >Save</Button>
=                  <Button>Save</Button>
                </DialogClose>
              </DialogDescription>
            </DialogHeader>
            {/* <DialogFooter>
                  <Button type="submit">Confirm</Button>
                </DialogFooter> */}
          </DialogContent>
        </Dialog>
      )
    }
  }

]
