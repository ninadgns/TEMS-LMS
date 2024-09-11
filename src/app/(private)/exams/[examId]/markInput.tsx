"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from 'react';
import { AllStudents } from '../../../../lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExamInfo, ResultData, ResultEntry, ResultEntryWithSuffix } from '@/lib/types';
import { columns } from "./column";
import { DataTable } from "@/components/tanStackTable";
import { saveAs } from 'file-saver';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { getOrdinalSuffix, isSubsequence } from "@/lib/utils";
import { toast, useToast } from "@/components/ui/use-toast";
import { Title, ToastAction } from "@radix-ui/react-toast";
import { createClient } from "@/utils/supabase/client";
import { useFormField } from "@/components/ui/form";
import { RotateCw } from "lucide-react";

// const Dictionary = AllStudents;


export interface ExamInfoProps {
    examData: ExamInfo
    Dictionary: string[]
}



const MarkInputPage: React.FC<ExamInfoProps> = ({ examData, Dictionary }) => {
    const supabase = createClient();
    // console.log(examData.results)
    const [data, setData] = useState<ResultEntry[]>(examData.results || []);
    useEffect(() => {
        if (examData.results)
            setData(examData.results)
    }, [examData.results])

    const [inputName, setInputName] = useState('');
    const [inputMark, setInputMark] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const markRef = useRef<HTMLInputElement>(null);




    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputName(value);
        const filteredSuggestions = Dictionary.filter(word =>
            isSubsequence(value.toLowerCase(), word.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };

    const save = async () => {
        if (!examData.id) return
        const { data: supabaseData, error } = await supabase
            .from('Exams')
            .update(
                { resultEntries: data }
            )
            .eq("id", examData.id)
            .select()
        if (error) console.log(error)
        else
            toast({
                title: "Table Updated",
            })
    }
    const handleDownload = async () => {
        toast({
            title: "Please wait while PDF is being generated",
        })

        if (!examData.id) return
        const { data: supabaseData, error } = await supabase
            .from('Exams')
            .update(
                { resultEntries: data }
            )
            .eq("id", examData.id)
            .select()
        if (error) console.log(error)

        const rearrangedResults: ResultEntryWithSuffix[] = [];
        data.forEach(result => {
            const rearrangedResult: ResultEntryWithSuffix = {
                serial: result.serial,
                name: result.name,
                marks: result.marks,
                position: result.position + getOrdinalSuffix(result.position || 0)
            };
            rearrangedResults.push(rearrangedResult);
        });


        var processedExamData: ResultData = {
            resultEntries: rearrangedResults,
            examInfo: examData
        }
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(processedExamData),
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }



        const blob = await response.blob();
        saveAs(blob, 'generated.pdf');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === "Enter" || event.key === "Tab") && event.target === inputRef.current) {
            event.preventDefault();
            if (suggestions[0])
                setInputName(suggestions[0]);
            setSuggestions([]);
            markRef.current?.focus();
            setSuggestions([event.key])
        }
        else if ((event.key === "Enter" || event.key === "Tab")) {
            event.preventDefault();

            setSuggestions([event.key])
        } else
            setSuggestions([event.key])
    };
    const handleClick = (index: number) => {
        setInputName(suggestions[index]);
        setSuggestions([]);
    }

    const update = () => {
        setData(() => {
            const a = [...data]
                .sort((a, b) => a.serial - b.serial)
                .sort((a, b) => b.marks - a.marks);
            let currentPosition = 1;
            let currentMarks = a[0]?.marks;

            a.forEach((entry) => {
                if (entry.marks < currentMarks) {
                    currentPosition++;
                    currentMarks = entry.marks;
                }
                entry.position = currentPosition;
            });
            var staticserial = 1;
            a.forEach(entry => {
                entry.serial = staticserial++;
            })
            a.sort((a, b) => a.serial - b.serial);

            return a;
        })
        toast({
            title: "Table Updated",
        })
    }



    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Name:', inputName);
        console.log('Mark:', inputMark);
        setData(() => {
            const a = [...data, { name: inputName, marks: parseFloat(inputMark), position: null, serial: 1000000 }]
                .sort((a, b) => a.serial - b.serial)
                .sort((a, b) => b.marks - a.marks);
            let currentPosition = 1;
            let currentMarks = a[0]?.marks;

            a.forEach((entry) => {
                if (entry.marks < currentMarks) {
                    currentPosition++;
                    currentMarks = entry.marks;
                }
                entry.position = currentPosition;
            });
            var staticserial = 1;
            a.forEach(entry => {
                entry.serial = staticserial++;
            })
            a.sort((a, b) => a.serial - b.serial);

            return a;
        })

        // console.log(data);
        setInputMark('');
        setInputName('');
        inputRef.current?.focus();
    };

    return (
        <div >
            <div className="mb-5">
                {/* <Button onClick={update}>Update Table</Button> */}

                <DataTable filter="name" columns={columns} data={data} />
            </div>
            <form onSubmit={handleFormSubmit} className="flex gap-1 mt-2">
                <Input
                    type="text"
                    value={inputName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your name..."
                    ref={inputRef}
                />
                <Input
                    type="text"
                    value={inputMark}
                    onChange={(e) => setInputMark(e.target.value)}
                    placeholder="Type your mark..."
                    ref={markRef}
                />

                <Button type="submit" >
                    Add Entry
                </Button>
            </form>
            <div className="flex gap-x-2 my-3">
                <Button onClick={save}>Save Results for Future</Button>
                <Button onClick={handleDownload}>Download PDF</Button>
                <Button onClick={update} className="px-2"><RotateCw /></Button>

            </div>
            <ul>
                {suggestions.map((word, index) => (
                    <li className="mt-2 ml-2 bg-red-100 transform transition-transform duration-200 hover:scale-95" onClick={() => handleClick(index)} key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

export default MarkInputPage;
