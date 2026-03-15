import { createSummaryStringForAI, Summary } from "@/lib/data";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BarChart, FileDown, FileText, Hash, TrendingUp } from "lucide-react";
import { SummaryCharts } from "./summary_charts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";

interface DataSummaryProps {
  summary: Summary;
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  colorClass,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  colorClass?: string;
}) => (
  <Card className={`flex-1 text-white ${colorClass}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const DataSummary = ({ summary }: DataSummaryProps) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Analysis Summary for ${summary.fileName}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total rows: ${summary.rowCount}`, 14, 30);
    doc.text(`Total columns: ${summary.columnCount}`, 14, 36);

    if (summary.numericalColumns.length > 0) {
      autoTable(doc, {
        startY: 45,
        head: [["Numerical Columns", "Count", "Mean", "Std Dev", "Min", "Max"]],
        body: summary.numericalColumns.map((col) => [
          col.name,
          col.stats.count,
          col.stats.mean,
          col.stats.stdDev,
          col.stats.min,
          col.stats.max,
        ]),
      });
    }
    if (summary.categoricalColumns.length > 0) {
      autoTable(doc, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [["Categorical Columns", "Unique Values", "Top 5 Values"]],
        body: summary.categoricalColumns.map((col) => [
          col.name,
          col.stats.uniqueCount,
          Object.entries(col.stats.topValues)
            .map(([key, value]) => `${key} (${value})`)
            .join(", "),
        ]),
      });
    }

    doc.save(`summary_${summary.fileName.split(".")[0]}.pdf`);
  };

  const handleDownloadDoc = () => {
    const summaryString = createSummaryStringForAI(summary);
    const blob = new Blob([summaryString], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `summary_${summary.fileName.split(".")[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="font-space-grotesk text-2xl">
              Analysis Summary
            </CardTitle>
            <CardDescription>
              Key statistics and insights from your data.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadPdf}>
              <FileDown className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" onClick={handleDownloadDoc}>
              <FileDown className="mr-2 h-4 w-4" />
              DOC
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <StatCard
            icon={Hash}
            title="Rows"
            value={summary.rowCount.toLocaleString()}
          />
          <StatCard
            icon={FileText}
            title="Columns"
            value={summary.columnCount}
          />
          <StatCard
            icon={TrendingUp}
            title="Numerical Columns"
            value={summary.numericalColumns.length}
          />
          <StatCard
            icon={BarChart}
            title="Categorical Columns"
            value={summary.categoricalColumns.length}
          />
        </div>
        <SummaryCharts summary={summary} />
      </CardContent>
    </Card>
  );
};

export default DataSummary;
