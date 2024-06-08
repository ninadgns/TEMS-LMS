"use client"
// components/MultiLineForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { DataTable } from './dataTable';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { ResultEntry } from '@/lib/types';

const MultiLineForm: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [data, setData] = useState<ResultEntry[]>([]);


  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lines = inputText.split('\n');
    const result: ResultEntry[] = lines
      .filter(line => line.trim() !== '')
      .map(line => {
        const [name, marksStr] = line.split(/\s+/); // Split by any number of whitespace characters
        return {
          name: name.replace(/_/g, ' '),
          marks: parseInt(marksStr, 10),
          position: null,
          serial: 0
        };
      }).sort((a, b) => b.marks - a.marks);
    const multilineString = result.map(entry => `${entry.name.replace(/ /g, '_')} ${entry.marks}`).join('\n');


    let currentPosition = 1;
    let currentMarks = result[0]?.marks;

    result.forEach((entry, index) => {
      if (entry.marks < currentMarks) {
        currentPosition = index + 1;
        currentMarks = entry.marks;
      }
      entry.position = currentPosition;
    });


    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;


    console.log(result);
    setData(result)
    setInputText(multilineString);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={inputText}
          onChange={handleInputChange}
          rows={10}
          cols={50}
          placeholder="Enter name and marks separated by space, one per line"
        ></Textarea>
        <Button type="submit" value={"sorted"}>Show</Button>
        {/* <Button type="submit" value={"notSorted"}>Sort & Show</Button> */}
      </form>
      <DataTable columns={columns} data={data} />
    </div>

  );
};

export default MultiLineForm;
