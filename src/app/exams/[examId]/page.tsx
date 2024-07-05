'use client';

import { ExamInfo, ResultEntrySchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MarkInputPage from './markInput';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EditExamInfo from './editExam';
import { ParseSpeeds } from 'pdf-lib';
export default function Page({ params }: { params: { examId: string } }) {
    const router = useRouter();
    const supabase = createClient();
    const [examData, setExamData] = useState<ExamInfo>({ batchName: "", date: new Date(), fullMark: 8, topic: "", subject: "" });
    const [hehe, setHehe] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            let { data: Exams, error } = await supabase
                .from('Exams')
                .select("*")
                .eq('id', params.examId)
            if (Exams) {
                const { resultEntries, ...otherEntries } = Exams[0]
                let parsedResults
                if (resultEntries)
                    parsedResults = ResultEntrySchema.array().parse(resultEntries);
                setExamData({ ...otherEntries, results: parsedResults, date: new Date(Exams[0].date) });
            }
            else console.log(error);

        }

        fetch();
    }, [params, hehe])

    const handleRefresh = () => {
        router.refresh();
        setHehe(hehe + 1);
    };
    return (
        <div>
            {examData.batchName != "" &&
                <Card className='mb-5'>
                    <CardHeader>
                        <CardTitle><div className="flex justify-between"><div >{examData.topic + " - " + examData.batchName + " " + examData.subject}</div>
                            <div>
                                <EditExamInfo params={{ initialData: examData }} onRefresh={handleRefresh} />
                            </div>
                        </div></CardTitle>
                        <CardDescription>{examData.date.toUTCString().slice(0, 16)}<br></br>Full Mark: {examData.fullMark}</CardDescription>
                    </CardHeader>
                </Card>}

            <MarkInputPage examData={examData} />

        </div>
    );
}
