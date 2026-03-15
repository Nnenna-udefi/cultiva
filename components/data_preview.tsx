import { Column, Data } from "@/lib/data";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll_area";

interface DataPreviewProps {
  data: Data;
  columns: Column[];
}

const PREVIEW_ROW_COUNT = 10;

const DataPreview = ({ data, columns }: DataPreviewProps) => {
  const previewData = data.slice(0, PREVIEW_ROW_COUNT);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-space-grotesk">Data Preview</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-75 w-full rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.name}>{col.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell key={`${rowIndex}-${col.name}`}>
                      {String(row[col.name] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DataPreview;
