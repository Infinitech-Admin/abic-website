"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { jsPDF } from "jspdf";

interface Option {
  key: number;
  value: string;
  label: string;
}

interface Results {
  totalLoan: string;
  monthlyPayment: string;
  totalAmount: string;
}

const LoanCalculator: React.FC = () => {
  const years: Option[] = Array.from({ length: 25 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
  }));

  const months: Option[] = Array.from({ length: 11 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Month${i + 1 > 1 ? "s" : ""}`,
  }));

  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [selectedYears, setSelectedYears] = useState<number>(0);
  const [selectedMonths, setSelectedMonths] = useState<number>(0);
  const [results, setResults] = useState<Results>({
    totalLoan: "0.00",
    monthlyPayment: "0.00",
    totalAmount: "0.00",
  });

  const calculate = useCallback(() => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const termInMonths = selectedYears * 12 + selectedMonths;

    if (principal > 0 && rate >= 0 && termInMonths > 0) {
      const monthlyRate = rate / 12;
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonths));
      const totalLoan = monthlyPayment * termInMonths;

      setResults({
        totalLoan: totalLoan.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        monthlyPayment: monthlyPayment.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        totalAmount: (principal + totalLoan - principal).toLocaleString(
          undefined,
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        ),
      });
    } else {
      setResults({
        totalLoan: "0.00",
        monthlyPayment: "0.00",
        totalAmount: "0.00",
      });
    }
  }, [loanAmount, interestRate, selectedYears, selectedMonths]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const downloadTableAsPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const logoURL =
    "data:image/jpeg;base64,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";

    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 5; 

    doc.addImage(logoURL, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Document Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const title = "Abic Realty & Consultancy Corporation";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 30);

    // Address (Centered)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
   
    // Subtitle (Centered)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const subtitle = "Loan Calculation Results";
    doc.text(subtitle, pageWidth / 2, 50, { align: "center" });

    // Draw Header Line
    doc.line(20, 52, 190, 52);

    // Table Headers
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("LOAN DETAILS", 24, 58);
    doc.text("VALUE", 130, 58);

    // Draw Header Line
    doc.line(20, 62, 190, 62);

    // Table Rows Data
    const rows = [
      ["Years", `${selectedYears || 0} Year(s)`],
      ["Months", `${selectedMonths || 0} Month(s)`],
      [
        "Loan Amount",
        `PHP ${parseFloat(loanAmount || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      ],
      [
        "Interest Rate",
        `${parseFloat(interestRate || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}%`,
      ],
      ["Total Loan Amount (w/ interest)", "PHP " + (results.totalLoan || "0")],
      ["Monthly Payment", "PHP " + (results.monthlyPayment || "0")],
      ["Total Amount", "PHP " + (results.totalAmount || "0")],
    ];

    // Table Content
    let yPosition = 72;

    rows.forEach((row) => {
      doc.text(row[0], 24, yPosition);
      doc.text(row[1], 130, yPosition, { align: "left" });
      doc.line(20, yPosition + 2, 190, yPosition + 2); // Draw line after each row
      yPosition += 10;
    });

    // Draw Table Borders
    const startY = 52;
    const endY = yPosition - 8;
    doc.line(20, startY, 20, endY); // Left border
    doc.line(120, startY, 120, endY); // Divider between columns
    doc.line(190, startY, 190, endY); // Right border

    // Add Footer Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const footerY = pageHeight - 15;

    // Footer Divider Line
    doc.line(20, footerY - 5, 190, footerY - 5);

    // Footer Content
    const footerText1 = "Abic Realty & Consultancy Corporation";
    const footerText2 =
      "Unit 202, Campos Rueda Building, 101 Urban Ave, Makati, 1206 Metro Manila";
    const footerText3 =
      "Phone Number: (+63)9175-4809-99 | Email: abicrealty@gmail.com";

    doc.text(footerText1, pageWidth / 2, footerY, { align: "center" });
    doc.text(footerText2, pageWidth / 2, footerY + 4, { align: "center" });
    doc.text(footerText3, pageWidth / 2, footerY + 8, { align: "center" });

    // Save the PDF
    doc.save("loan_calculation_results.pdf");
  };

  return (
    <div className="container mx-auto flex-grow max-w-7xl w-full flex flex-col gap-4">
      <Card>
        <CardBody>
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <Select
        
              label="Select Years"
              size={"sm"}
              onChange={(e) => setSelectedYears(Number(e.target.value))}
            >
              {years.map((year) => (
                <SelectItem key={year.key} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </Select>

            <Select
        
              label="Select Months"
              size={"sm"}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
            >
              {months.map((month) => (
                <SelectItem key={month.key} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Enter Loan Amount (00.00)"
              size="sm"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <Input
              label="Enter Interest (%)"
              size="sm"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <Table aria-label="Loan Calculation Results">
        <TableHeader>
          <TableColumn>LOAN DETAILS</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Selected Years</TableCell>
            <TableCell>
              {selectedYears} Year{selectedYears > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Selected Months</TableCell>
            <TableCell>
              {selectedMonths} Month{selectedMonths > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Loan Amount</TableCell>
            <TableCell>
              ₱{" "}
              {parseFloat(loanAmount || "0").toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Interest Rate</TableCell>
            <TableCell>{interestRate || 0}%</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Total Loan Amount (w/ interest)</TableCell>
            <TableCell>₱ {results.totalLoan}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Monthly Payment</TableCell>
            <TableCell>₱ {results.monthlyPayment}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Total Amount</TableCell>
            <TableCell>₱ {results.totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button color="primary" onClick={downloadTableAsPDF} className="mt-4">
        Download Results as PDF
      </Button>
    </div>
  );
};

export default LoanCalculator;
