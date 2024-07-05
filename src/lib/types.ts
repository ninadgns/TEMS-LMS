import { z } from "zod"
import { ReactNode } from "react"

export const ResultEntrySchema = z.object({
  serial: z.number(),
  name: z.string(),
  marks: z.number(),
  position: z.number().nullable().optional(),
});

export type ResultEntry = z.infer<typeof ResultEntrySchema>


export const ExamSchema = z.object({
  id: z.number().optional(),
  topic: z.string({ required_error: "Name is required" }),
  fullMark: z.coerce.number({ required_error: "Full Mark is required" }),
  batchName: z.string({ required_error: "Batch Name is required" }),
  subject: z.string({ required_error: "Subject is required" }),
  date: z.date({ required_error: "Exam Date is required." }),
  results: z.array(ResultEntrySchema).optional()
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