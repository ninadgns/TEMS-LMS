import React from "react"
import { marks } from "@/lib/data";


const name = () => {
    return (
        <div className="p-5">
            <table className="min-w-full divide-y divide-black border">
                <thead className="">
                    <tr>
                        <th className="px-6 py-5 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
                        <th className="px-6 py-5 text-left text-xs font-medium  uppercase tracking-wider">Mark</th>
                        <th className="px-6 py-5 text-left text-xs font-medium  uppercase tracking-wider">Position</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black">
                    {marks.map((mark, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{mark.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mark.mark}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mark.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default name;
