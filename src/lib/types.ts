export type ResultEntry = {
    serial: number
    name: string
    marks: number
    position: number | undefined | null
  }
  
  export type ExamInfo = {
    batch: string
    name: string
    fullMark: number
    date: string
  }
  
  export type ResultData = {
    examInfo: ExamInfo
    resultEntries: ResultEntry[];
  }
  