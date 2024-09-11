import React from "react"

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
import { ResultEntry } from "@/lib/types";
import { Row } from "@tanstack/react-table";

const EditEntry = ({ row }: { row: Row<ResultEntry> }) => {
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
                        <p style={{ marginBottom: 8 }}>Please click the Update button after pressing Done</p>

                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            style={{ marginTop: 5 }}
                            id="name"
                            defaultValue={entry.name}
                            onChange={(e) => entry.name = e.target.value}
                            className="col-span-3"
                        />
                        <Label htmlFor="marks" className="text-right">
                            Marks
                        </Label>
                        <Input
                            style={{ marginTop: 5 }}
                            id="marks"
                            defaultValue={entry.marks}
                            onChange={(e) => entry.marks = parseFloat(e.target.value)}
                            className="col-span-3"
                        />
                        <Label htmlFor="serial" className="text-right">
                            Serial
                        </Label>
                        <Input
                            style={{ marginTop: 5 }}
                            id="serial"
                            defaultValue={entry.serial}
                            onChange={(e) => entry.serial = parseFloat(e.target.value) - .5}
                            className="col-span-3"
                        />

                        <DialogClose asChild>
                            <Button style={{ marginTop: 8 }}>Done</Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
};

export default EditEntry;
