"use client"
import ExamTable from './examTable';
import CreateExam from './createExam';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Page: React.FC = () => {

  const router = useRouter();
  const [hehe, setHehe] = useState(0);
   const handleRefresh = () => {
    router.refresh();
    setHehe(hehe + 1);
  };



  return (
    <div>
      <CreateExam onRefresh={handleRefresh} />
      <ExamTable hehe={hehe} handleRefresh={handleRefresh} />
    </div>
  );
};
export default Page;