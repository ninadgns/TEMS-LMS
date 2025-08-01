import ExamTable from './examTable';
import CreateExam from './createExam';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/server';
import { ExamInfo, ExamTypeDB } from '@/lib/types';
const Page: React.FC = async () => {

  const supabase = createClient();
  let Exams: ExamTypeDB[];
  let { data: ExamsMaybeNull, error } = await supabase
    .from('Exams')
    .select('*')

  if (error) {
    console.log(error);
  }

  // console.log(ExamsMaybeNull)
  Exams = ExamsMaybeNull as NonNullable<typeof ExamsMaybeNull>;
  let DateWiseSortedExams = Exams?.sort((a, b) => {
    // Convert the date strings to Date objects for accurate comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Sort in ascending order (earliest date first)
    // return dateA.getTime() - dateB.getTime();

    // For descending order (latest date first), use:
    return dateB.getTime() - dateA.getTime();
  });
  const handleRefresh = async () => {
    let { data: ExamsMaybeNull, error } = await supabase
      .from('Exams')
      .select('*')

    if (error) {
      console.log(error);
    }

    // console.log(ExamsMaybeNull)
    Exams = ExamsMaybeNull as NonNullable<typeof ExamsMaybeNull>;
    DateWiseSortedExams = Exams?.sort((a, b) => {
      // Convert the date strings to Date objects for accurate comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Sort in ascending order (earliest date first)
      // return dateA.getTime() - dateB.getTime();

      // For descending order (latest date first), use:
      return dateB.getTime() - dateA.getTime();
    });


  };



  return (
    <div>
      <CreateExam ExamData={DateWiseSortedExams} />
      {/* <ExamTable ExamData={DateWiseSortedExams} /> */}
    </div>
  );
};
export default Page;