import { ExamInfo } from '@/lib/types';
import React from 'react';
import { useForm } from 'react-hook-form';



const ExamForm = () => {
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExamInfo>()

  const onSubmit = (data: ExamInfo) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="batch">Batch:</label>
        <input id="batch" {...register('batch', { required: 'Batch is required' })} />
        {errors.batch && <p>{errors.batch.message}</p>}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="fullMark">Full Mark:</label>
        <input id="fullMark" type="number" {...register('fullMark', { required: 'Full Mark is required', valueAsNumber: true })} />
        {errors.fullMark && <p>{errors.fullMark.message}</p>}
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" {...register('date', { required: 'Date is required', valueAsDate: true })} />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExamForm;
