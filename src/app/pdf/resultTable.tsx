
import { Mark } from "@/lib/data";
import {getOrdinalSuffix} from "@/lib/utils";
interface ResultsTableProps {
    data: Mark[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
    return (
        <div className="">
            <header className="px-4 pt-4 text-center">
                <div className="flex ">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">TEMS Academy of Olympiad Math</h1>
                        <h2 className="text-2xl">Sigma Junior Math Batch</h2>
                        <h3 className="text-lg">Model Test 3: Divisibility & Series</h3>
                    </div>
                    <div className=""><img src="/LogoBW.png" alt="A beautiful scenery" width={100} /></div>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg ">Full Marks: 10</p>
                    <p className="text-right text-lg">Date: 4 May 2024</p>
                </div>
            </header>
            <div className="container mx-auto p-4">

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Sl</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((mark, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{mark.name}</td>
                                <td className="border px-4 py-2">{mark.mark}</td>
                                <td className="border px-4 py-2">{mark.position}{getOrdinalSuffix(mark.position)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default ResultsTable;
