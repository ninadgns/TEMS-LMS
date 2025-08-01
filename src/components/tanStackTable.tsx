"use client"

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filter: string
}



export function DataTable<TData, TValue>({ columns, data, filter }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});


	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),

		state: {
			sorting,
			columnFilters,
			pagination,

		}
	})


	return (

		<div>
			<div className="flex gap-3 items-center py-4 justify-between">
				<Input
					placeholder={`Filter ${filter}...`}
					value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn(filter)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between py-4">
				<Select
					value={table.getState().pagination.pageSize.toString()}
					onValueChange={(value) => setPagination(prev => ({
						...prev,
						pageSize: Number(value),
					}))}
				>
					<SelectTrigger className="w-auto">
						<span >{table.getState().pagination.pageSize}</span>
					</SelectTrigger>
					<SelectContent className="w-auto">
						{[10, 20, 30, 40, 50].map(size => (
							<SelectItem key={size} value={size.toString()}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPagination(prev => ({
							...prev,
							pageIndex: prev.pageIndex - 1
						}))}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPagination(prev => ({
							...prev,
							pageIndex: prev.pageIndex + 1
						}))}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div >
	)
}
