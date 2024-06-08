"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import React, { useState, useRef } from 'react';
import { AllStudents } from '../../lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExamInfo, ResultData, ResultEntry } from '@/lib/types';
import { columns } from "./columns";
import { DataTable } from './dataTable';
import { Router } from 'next/router';
import { saveAs } from 'file-saver';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { getOrdinalSuffix, isSubsequence } from "@/lib/utils";

const Dictionary = AllStudents;





const InputWithSuggestions: React.FC = () => {
    const [examInfo, setExamInfo] = useState<ExamInfo>({ date: "", fullMark: 100, name: "", batch: "" });
    const [date, setDate] = React.useState("");
    const [fullMark, setFullMark] = useState<string>("10");

    const [batchName, setBatchName] = useState<string>();
    const [examName, setExamName] = useState<string>();
    const [data, setData] = useState<ResultEntry[]>([]);
    const [inputName, setInputName] = useState('');
    const [inputMark, setInputMark] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const markRef = useRef<HTMLInputElement>(null);

    type ResultEntry2 = {
        serial: number
        name: string
        marks: number
        position: string
    }

    type ResultData2 = {
        resultEntries: ResultEntry2[],
        examInfo: ExamInfo,
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputName(value);
        const filteredSuggestions = Dictionary.filter(word =>
            isSubsequence(value.toLowerCase(), word.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };
    const handleDownload = async () => {
        const rearrangedResults: ResultEntry2[] = [];
        data.forEach(result => {
            const rearrangedResult: ResultEntry2 = {
                serial: result.serial,
                name: result.name,
                marks: result.marks,
                position: result.position + getOrdinalSuffix(result.position || 0)
            };
            rearrangedResults.push(rearrangedResult);
        });


        var examData: ResultData2 = {
            resultEntries: rearrangedResults,
            examInfo: examInfo
        }
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(examData),
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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Name:', inputName);
        console.log('Mark:', inputMark);
        setData(() => {
            const a = [...data, { name: inputName, marks: parseFloat(inputMark), position: null, serial: 0 }].sort((a, b) => b.marks - a.marks);
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
            return a;
        })

        console.log(data);
        setInputMark('');
        setInputName('');
        inputRef.current?.focus();
    };

    const handleExamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        var a: ExamInfo = {
            fullMark: parseFloat(fullMark.toString()),
            name: examName || "",
            // date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            date: date,
            // batch: batchName as "Alpha" | "Sigma" | "Gamma"
            batch: batchName || ""

        }
        // console.log(a.date)
        setExamInfo(a);
    }

    return (
        <div className='p-5' >

            <div className="mb-5">
                <DataTable columns={columns} data={data} />
            </div>
            <form onSubmit={handleExamSubmit} className='flex gap-1'>
                <Input
                    type='text'
                    value={examName}
                    placeholder='Modular Arithmatic'
                    onChange={(e) => setExamName(e.target.value)}

                />
                <Input
                    type='number'
                    value={fullMark}
                    placeholder='Total Marks'
                    onChange={(e) => setFullMark(e.target.value)}

                />
                <Input
                    type='text'
                    value={batchName}
                    placeholder='Batch Name'
                    onChange={(e) => setBatchName(e.target.value)}
                />
                <Input
                    type='text'
                    value={date}
                    placeholder='Exam Date'
                    onChange={(e) => setDate(e.target.value)}
                />
                {/* <Select >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Batch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Alpha">Alpha</SelectItem>
                        <SelectItem value="Sigma">Sigma</SelectItem>
                        <SelectItem value="Gamma">Gamma</SelectItem>
                    </SelectContent>
                </Select> */}

                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !examInfo?.date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            // onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover> */}


                <Button type="submit" >
                    Save Exam Info
                </Button>
            </form>
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
            <Button onClick={handleDownload}>Download PDF</Button>

            <ul>
                {suggestions.map((word, index) => (
                    <li className="mt-2 ml-2 bg-red-100 transform transition-transform duration-200 hover:scale-95" onClick={() => handleClick(index)} key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

export default InputWithSuggestions;
