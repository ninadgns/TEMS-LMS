import React from "react"
import ResultsTable from "./resultTable";
import { marks } from "@/lib/data";
import Image from "next/image";


const name = () => {
    return (
        <div className="m-4">
            
            <ResultsTable data={marks} />
        </div>
    )
};

export default name;
