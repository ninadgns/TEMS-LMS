// app/api/generate-pdf/route.ts

import { comicSansFontByte } from '@/lib/comicsans';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, PDFObject, rgb, StandardFonts } from 'pdf-lib';
import fontKit from '@pdf-lib/fontkit'
import { readFile } from 'fs/promises';
import { logoBW } from '@/lib/logo';
import { comicSansBoldFontByte } from '@/lib/comicsansbold';



function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}




export async function POST(request: NextRequest) {
	var data = await request.json();
	const examInfo = data.examInfo;
	const examName =  examInfo.name;
	const examBatchName = examInfo.batch + " Batch";
	const examDate = "Date: " + examInfo.date;
	const examFullMark = "Full Mark: " + examInfo.fullMark;
	data = data.resultEntries;

	const pdfDoc = await PDFDocument.create();
	pdfDoc.registerFontkit(fontKit);

	const comicSans = await pdfDoc.embedFont(comicSansFontByte);
	const comicSansBold = await pdfDoc.embedFont(comicSansBoldFontByte);
	const timesNewRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
	const fontSize = 14;
	const margin = 50;
	const marginTop = 170;
	const rowHeight = 25;
	const pageHeight = 842;
	const pageWidth = 597.6;
	const tableWidth = 497.6;
	const serialColumnWidth = comicSans.widthOfTextAtSize("10000", fontSize);
	const marksColumnWidth = comicSans.widthOfTextAtSize("Marks____", fontSize);
	const positionColumnWidth = comicSans.widthOfTextAtSize("Position___", fontSize);
	const nameColumnWidth = tableWidth - serialColumnWidth - marksColumnWidth - positionColumnWidth;
	var columnWidths = [0,
		serialColumnWidth,
		serialColumnWidth + nameColumnWidth,
		serialColumnWidth + nameColumnWidth + marksColumnWidth,
		serialColumnWidth + nameColumnWidth + marksColumnWidth + positionColumnWidth]
	// const columnWidth = tableWidth / Object.keys(data[0]).length;
	const keys = Object.keys(data[0]);
	const headerTitles = ["Sl", "Name", "Marks", "Position"]

	const drawTableBorders = (page: any, rowCount: number) => {
		const tableHeight = rowCount * rowHeight;
		let x = margin;
		let y = pageHeight - marginTop;
		page.drawRectangle({
			x,
			y: y - tableHeight - rowHeight / 3,
			width: tableWidth,
			height: tableHeight,
			borderColor: rgb(0, 0, 0),
			borderWidth: 1,
		});

		//draw vertical separators
		headerTitles.forEach((header, index) => {
			page.drawLine({
				start: { x: x + columnWidths[index], y: y - rowHeight / 3 },
				end: { x: x + columnWidths[index], y: y - tableHeight - rowHeight / 3 },
				color: rgb(0, 0, 0),
				thickness: 1,
			});
		});

		for (let i = 0; i <= rowCount; i++) {
			page.drawLine({
				start: { x, y: y - i * rowHeight - rowHeight / 3 },
				end: { x: x + tableWidth, y: y - i * rowHeight - rowHeight / 3 },
				color: rgb(0, 0, 0),
				thickness: 1,
			});
		}
	};


	const drawTableHeaders = (page: any) => {
		let x = margin + rowHeight / 3;
		headerTitles.forEach((header, index) => {
			page.drawText(header, {
				x,
				y,
				size: fontSize,
				font: comicSans,
				color: rgb(0, 0, 0),
			});
			x = margin + rowHeight / 3 + columnWidths[index + 1];
		});
		y -= rowHeight;
		currentPageRowCount++;
	};

	const drawTableRow = (row: any, page: any) => {
		let x = margin + rowHeight / 3;
		keys.forEach((key, index) => {
			page.drawText(String(row[key]), {
				x,
				y,
				size: fontSize,
				font: comicSans,
				color: rgb(0, 0, 0),
			});
			x = margin + rowHeight / 3 + columnWidths[index + 1];
		});
		y -= rowHeight;
		currentPageRowCount++;
	};


	let page = pdfDoc.addPage([600, pageHeight]);
	let y = pageHeight - marginTop;
	let currentPageRowCount = 0;
	// Embed the image
	const imageBuffer = Buffer.from(logoBW, 'base64');
	const image = await pdfDoc.embedPng(imageBuffer);
	const imageHeight = 90;
	const imageWidth = 90;
	// Draw image


	function drawTitle() {
		page.drawImage(image, {
			x: pageWidth - margin - imageWidth,
			y: pageHeight - margin - imageHeight,
			width: imageWidth,
			height: imageHeight,
		});
		const ClubName = "TEMS Academy of Olympiad Math"
		page.drawText(ClubName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSansBold.widthOfTextAtSize(ClubName, 24) / 2 + 50,
			y: -10 + pageHeight - margin - comicSansBold.heightAtSize(24) / 2,
			size: 24,
			font: comicSansBold,
			color: rgb(0, 0, 0),
		});
		page.drawText(examBatchName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSansBold.widthOfTextAtSize(examBatchName, 20) / 2 + 50,
			y: -10 + pageHeight - margin - comicSansBold.heightAtSize(25) - comicSansBold.heightAtSize(20) / 2,
			size: 20,
			font: comicSansBold,
			color: rgb(0, 0, 0),
		});
		page.drawText(examName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSansBold.widthOfTextAtSize(examName, 18) / 2 + 50,
			y: -10 + pageHeight - margin - comicSansBold.heightAtSize(25) - comicSansBold.heightAtSize(20) - comicSansBold.heightAtSize(18) / 2,
			size: 18,
			font: comicSansBold,
			color: rgb(0, 0, 0),
		});
		page.drawText(examDate, {
			x: margin,
			y: pageHeight - marginTop,
			size: fontSize,
			font: comicSans,
			color: rgb(0, 0, 0),
		})
		page.drawText(examFullMark, {
			x: pageWidth - margin - comicSans.widthOfTextAtSize(examFullMark, fontSize),
			y: pageHeight - marginTop,
			size: fontSize,
			font: comicSans,
			color: rgb(0, 0, 0),
		})
	}





	// drawTableBorders(page, headers, currentPageRowCount);
	y = pageHeight - marginTop - rowHeight;
	drawTableHeaders(page);
	drawTitle();
	data.forEach((row: any) => {
		if (y < margin) {
			drawTableBorders(page, currentPageRowCount);
			page = pdfDoc.addPage([pageWidth, pageHeight]);
			drawTitle();
			y = pageHeight - marginTop - rowHeight;
			currentPageRowCount = 0;
			drawTableHeaders(page);
		}
		drawTableRow(row, page);
	});
	drawTableBorders(page, currentPageRowCount);



	const pdfBytes = await pdfDoc.save();



	return new NextResponse(pdfBytes, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename=generated.pdf',
			'Content-Length': pdfBytes.length.toString(),
		},
	});
}
