/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, UploadCloud } from "lucide-react";
import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "./hooks/use-toast";
import { parseFile, summarizeData, createSummaryStringForAI } from "@/lib/data";
import { generateRScriptForAnalysis } from "@/ai/flows/generate_R_script";

interface FileUploaderProps {
  setFile: (file: File | null) => void;
  setData: (data: any[] | null) => void;
  setColumns: (columns: any[] | null) => void;
  setSummary: (summary: any | null) => void;
  setRScript: (script: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
}

const FileUploader = ({
  setFile,
  setColumns,
  setData,
  setError,
  setIsLoading,
  setRScript,
  setSummary,
  isLoading,
}: FileUploaderProps) => {
  const { toast } = useToast();

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        // Enables the 10MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
        });
        return;
      }
      setIsLoading(true);
      setError(null);
      setFile(file);

      try {
        const { data, columns } = await parseFile(file);
        setData(data);
        setColumns(columns);

        const summaryData = summarizeData(data, columns, file.name);
        setSummary(summaryData);

        const summaryString = createSummaryStringForAI(summaryData);

        const { rScript } = await generateRScriptForAnalysis({
          dataSummary: summaryString,
        });
        setRScript(rScript);
      } catch (e: any) {
        const errorMessage =
          typeof e === "string"
            ? e
            : e.message || "An unexpected error occurred.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Processing Error",
          description: errorMessage,
        });
        // when there is an error, Reset state
        setData(null);
        setColumns(null);
        setSummary(null);
        setRScript(null);
        setFile(null);
      } finally {
        setIsLoading(false);
      }
    },
    [
      setData,
      setColumns,
      setIsLoading,
      setFile,
      setError,
      setSummary,
      setRScript,
      toast,
    ],
  );

  // to drag a file
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary", "bg-accent/50");
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-accent/50");
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-accent/50");
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto bg-softBackground">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl md:text-3xl">
            Start by Uploading a File
          </CardTitle>
          <CardDescription className="hidden">
            Drag and drop your file below or click to browse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center transition-colors",
            )}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-accent">Analyzing your data...</p>
              </div>
            ) : (
              <>
                <UploadCloud className="mb-4 h-12 w-12 text-accent" />
                <p className="mb-2 font-semibold text-foreground">
                  Drag & drop your file here
                </p>
                <p className="mb-4 text-sm text-accent">or</p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) =>
                    handleFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                <p className="mt-4 text-xs text-accent">
                  Supported formats: CSV, XLSX, XLS (Maximum size: 10MB)
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploader;
