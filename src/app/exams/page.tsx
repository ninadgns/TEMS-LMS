"use client"
import ExamTable from './examTable';
import CreateExam from './createExam';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Page: React.FC = () => {

  const router = useRouter();
  const [refreshVar, setRefreshVar] = useState(0);
  const handleRefresh = () => {
    router.refresh();
    setRefreshVar(refreshVar + 1);
  };



  return (
    <div>
      <CreateExam onRefresh={handleRefresh} />
      <ExamTable refreshVar={refreshVar} />
    </div>
  );
};
export default Page;