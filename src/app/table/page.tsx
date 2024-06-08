import { Payment, columns } from "./columns"
import { DataTable } from "./dataTable"
import { payments } from "../../lib/data"
import DownloadPDFButton from "@/app/table/DownloadPDFButton";


export default async function DemoPage() {
    const data = payments;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
            <DownloadPDFButton/>
        </div>
    )
}
