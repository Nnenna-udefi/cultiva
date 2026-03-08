import { Loader2, UploadCloud } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

const FileUploader = () => {
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto bg-softBackground">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl md:text-3xl">
            Start by Uploading a File
          </CardTitle>
          <CardDescription>
            Drag and drop your file below or click to browse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            //   onDragOver={onDragOver}
            //   onDragLeave={onDragLeave}
            //   onDrop={onDrop}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center transition-colors",
            )}
          >
            {/* {isLoading ? ( */}
            {/* <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-accent">Analyzing your data...</p>
            </div> */}
            {/* ) : ( */}
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
                // onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)}
              />
              <p className="mt-4 text-xs text-accent">
                Supports: CSV, XLSX, XLS (Max 10MB)
              </p>
            </>
            {/* )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploader;
