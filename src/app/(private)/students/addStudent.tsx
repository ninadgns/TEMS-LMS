"use client"
import React, { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast"

const AddStudent = () => {
    const [inputName, setInputName] = useState("");
    const onSubmit = async () => {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('Students')
            .insert([
                { name: inputName },
            ])
            .select()
        if (error)
            toast({
                title: "Could not submit values",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                ),
            })
        else
            toast({
                title: "Value submitted",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
    }

    return (
        <div>
            <AlertDialog>

                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-semibold">Students</h1>
                    <AlertDialogTrigger asChild>
                        <Button className="ml-auto" >Add Student</Button>
                    </AlertDialogTrigger>
                </div>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter name</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="mt-2 flex w-full max-w-sm items-center space-x-2">
                                <Input type="text" placeholder="Name" value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};

export default AddStudent;
