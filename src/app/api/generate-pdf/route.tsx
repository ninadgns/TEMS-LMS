// app/api/generate-pdf/route.ts

import { comicSansFontByte } from '@/lib/comicsans';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, PDFObject, rgb, StandardFonts } from 'pdf-lib';
import fontKit from '@pdf-lib/fontkit'
import { readFile } from 'fs/promises';
import { logoBW } from '@/lib/logo';
import { comicSansBoldFontByte } from '@/lib/comicsansbold';
import { format } from 'date-fns';


// vDwj7C0mqHKrUvES
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
	console.log(examInfo)
	const examName = examInfo.topic;
	const examFullMark = "Full Mark: " + examInfo.fullMark;
	const examBatchName = examInfo.batchName + " " + examInfo.subject + " Batch";
	const examDate = "Date: " + format(examInfo.date, 'dd MMMM yyyy');
	data = data.resultEntries;

	const pdfDoc = await PDFDocument.create();
	pdfDoc.registerFontkit(fontKit);

	const comicSans = await pdfDoc.embedFont(comicSansFontByte);
	const comicSansBold = await pdfDoc.embedFont(comicSansBoldFontByte);
	const timesNewRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
	var fontSize = 14;
	const margin = 50;
	const marginTop = 160;
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
			borderColor: rgb(.5, .5, .5),
			borderWidth: .5,
		});

		//draw vertical separators
		headerTitles.forEach((header, index) => {
			page.drawLine({
				start: { x: x + columnWidths[index], y: y - rowHeight / 3 },
				end: { x: x + columnWidths[index], y: y - tableHeight - rowHeight / 3 },
				borderColor: rgb(.5, .5, .5),
				thickness: .4,
			});
		});

		for (let i = 0; i <= rowCount; i++) {
			page.drawLine({
				start: { x, y: y - i * rowHeight - rowHeight / 3 },
				end: { x: x + tableWidth, y: y - i * rowHeight - rowHeight / 3 },
				borderColor: rgb(.5, .5, .5),
				thickness: .4,
				
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
				font: comicSansBold,
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
	const imageHeight = 85;
	const imageWidth = 85;
	// Draw image


	function drawTitle() {
		page.drawImage(image, {
			x: pageWidth - margin - imageWidth,
			y: pageHeight - margin - imageHeight + 15,
			width: imageWidth,
			height: imageHeight,
		});

		const ClubName = "TEMS Academy of Olympiad Math"
		const clubNameFontSize = 23
		page.drawText(ClubName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSansBold.widthOfTextAtSize(ClubName, clubNameFontSize) / 2 + 50,
			y: pageHeight - margin - comicSansBold.heightAtSize(clubNameFontSize) / 2,
			size: clubNameFontSize,
			font: comicSansBold,
			color: rgb(0, 0, 0),
		});
		let examBatchNameFontSize = 20
		while (comicSansBold.widthOfTextAtSize(examBatchName, examBatchNameFontSize) > 400)
			examBatchNameFontSize--;
		console.log(examBatchNameFontSize)
		page.drawText(examBatchName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSansBold.widthOfTextAtSize(examBatchName, examBatchNameFontSize) / 2 + 50,
			y: pageHeight - margin - comicSansBold.heightAtSize(clubNameFontSize) - comicSansBold.heightAtSize(examBatchNameFontSize) / 2,
			size: examBatchNameFontSize,
			font: comicSansBold,
			color: rgb(0, 0, 0),
		});
		const examNameFontSize = examBatchNameFontSize - 2;
		page.drawText(examName, {
			x: (pageWidth - margin * 2 - imageWidth) / 2 - comicSans.widthOfTextAtSize(examName, examNameFontSize) / 2 + 50,
			y: pageHeight - margin - comicSansBold.heightAtSize(clubNameFontSize) - comicSansBold.heightAtSize(examBatchNameFontSize) - comicSans.heightAtSize(examNameFontSize) * 2 / 3,
			size: examNameFontSize,
			font: comicSans,
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
