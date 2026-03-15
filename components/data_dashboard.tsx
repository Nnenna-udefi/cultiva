import { Column, Data, Summary } from "@/lib/data";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, FileIcon } from "lucide-react";
import DataPreview from "./data_preview";
import DataSummary from "./data_summary";
import { RScriptDisplay } from "./r_script_display";

interface DataDashboardProps {
  file: File | null;
  data: Data;
  columns: Column[] | null;
  summary: Summary | null;
  rScript: string | null;
  onReset: () => void;
}
const DataDashboard = ({
  file,
  data,
  columns,
  summary,
  rScript,
  onReset,
}: DataDashboardProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <FileIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-space-grotesk text-2xl font-semibold">
              {file?.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          {summary && <DataSummary summary={summary} />}
        </div>

        <div className="space-y-6">
          {data && columns && <DataPreview data={data} columns={columns} />}
        </div>

        <div className="space-y-6">
          <RScriptDisplay script={rScript} />
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;
