import { z } from "zod"
import { ReactNode } from "react"

export type ResultEntry = {
  serial: number
  name: string
  marks: number
  position: number | undefined | null
}

export const ExamSchema = z.object({
  examTopic: z.string({ required_error: "Name is required" }),
  examFullMark: z.coerce.number({ required_error: "Full Mark is required" }),
  batchName: z.string({ required_error: "Batch Name is required" }),
  subject: z.string({ required_error: "Subject is required" }),
  examDate: z.date({ required_error: "Exam Date is required." }),
})

export type ExamInfo = z.infer<typeof ExamSchema>;

export interface Route {
  path: string;
  label: string;
  Icon: ReactNode;
}

export type ResultEntryWithSuffix = {
  serial: number
  name: string
  marks: number
  position: string
}

export type ResultData = {
  resultEntries: ResultEntryWithSuffix[],
  examInfo: ExamInfo,
}