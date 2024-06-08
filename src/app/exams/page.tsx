// pages/index.tsx
"use client"
import Head from 'next/head';
import InputWithSuggestions from './markInputPage';
import ExamForm from './examForm';
import { ExamInfo } from '@/lib/types';
import { useState } from 'react';
const Home: React.FC = () => {
  const [exam, setExam] = useState<ExamInfo>({ batchName: "", category: "", examDate: new Date(), examFullMark: 10, examTopic: "", subject: "" });

  const onsubmit = (data: ExamInfo) => {
    setExam(data);
  };

  return (
    <div>
      {/* <MultiLineForm /> */}
      <InputWithSuggestions examData={exam} />
      <ExamForm parentSubmit={onsubmit} />
    </div>
  );
};

export default Home;
