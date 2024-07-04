"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { ExamInfo, ExamSchema } from "@/lib/types"



interface ExamFormProps {
  parentSubmit: (data: ExamInfo) => void;

}


const ExamForm: React.FC<ExamFormProps> = ({ parentSubmit }) => {
  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
  })
  const submitRef = useRef<HTMLInputElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  function onSubmit(data: z.infer<typeof ExamSchema>) {
    data.examDate.setHours(data.examDate.getHours() - data.examDate.getTimezoneOffset() / 60);
    data.examDate.setMinutes(data.examDate.getHours() - data.examDate.getTimezoneOffset() % 60);
    
    
    
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    console.log(data.examDate.getTimezoneOffset());
    console.log(data);
    parentSubmit(data)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 m-5">

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="max-w-96 ">
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batchName"
          render={({ field }) => (
            <FormItem className="max-w-96 ">
              <FormLabel>Batch Name</FormLabel>
              <FormControl>
                <Input placeholder="Sigma Junior" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examTopic"
          render={({ field }) => (
            <FormItem className="max-w-96 ">
              <FormLabel>Exam Topic</FormLabel>
              <FormControl>
                <Input placeholder="Modular Arithmatic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examFullMark"
          render={({ field }) => (
            <FormItem className="max-w-96 ">
              <FormLabel>Full Marks</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>                <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => { setCalendarOpen(false); return field.onChange(e) }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  // initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Save Exam Info</Button>
      </form>
    </Form>
  )
}
export default ExamForm;