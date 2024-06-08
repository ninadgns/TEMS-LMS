// pages/index.tsx
import Head from 'next/head';
import MultiLineForm from './oldForm';
import InputWithSuggestions from './markInputPage';
import ExamForm from './examForm';

const Home: React.FC = () => {
  return (
    <div>
      {/* <MultiLineForm /> */}
      {/* <InputWithSuggestions/> */}
      <ExamForm/>
    </div>
  );
};

export default Home;
