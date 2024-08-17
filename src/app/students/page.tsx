import React from "react"
import { createClient } from "@/utils/supabase/server";
import StudentTable from "./tablePrep";
import AddStudent from "./addStudent";


const Students = async () => {
    const supabase = createClient();
 
    let { data: studentsMaybeNull, error } = await supabase
        .from('Students')
        .select('id, name')
    //  console.log(error)
        console.log(studentsMaybeNull);
    const students = studentsMaybeNull as NonNullable<typeof studentsMaybeNull>
    return (
        <div className="">
            <AddStudent/>
            <StudentTable data={students} />
        </div>
    )
};

export default Students;
