import * as XLSX from "xlsx";

export type Data = Record<string, string | number>[];
export type Column = { name: string; type: "numerical" | "categorical" };
export type Summary = {
  fileName: string;
  rowCount: number;
  columnCount: number;
  numericalColumns: { name: string; stats: Record<string, number> }[];
  categoricalColumns: {
    name: string;
    stats: { uniqueCount: number; topValues: Record<string, number> };
  }[];
};
export type ChartData = {
  name: string;
  data: { name: string; value: number }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumeric(val: any): boolean {
  if (val === null || val === "") return true; // Treat empty cells as numeric-compatible
  return !isNaN(parseFloat(val)) && isFinite(val);
}

export async function parseFile(
  file: File,
): Promise<{ data: Data; columns: Column[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData =
          XLSX.utils.sheet_to_json<Record<string, string | number>>(worksheet);

        if (jsonData.length === 0) {
          reject("File is empty or could not be parsed.");
          return;
        }

        const headers = Object.keys(jsonData[0]);
        const columns: Column[] = headers.map((header) => {
          const isNum = jsonData.every((row) => isNumeric(row[header]));
          return { name: header, type: isNum ? "numerical" : "categorical" };
        });

        resolve({ data: jsonData, columns });
      } catch (err) {
        reject(
          "Error parsing file. Please ensure it is a valid CSV or Excel file.",
        );
      }
    };
    reader.onerror = (err) => reject("Error reading file.");
    reader.readAsBinaryString(file);
  });
}

export function summarizeData(
  data: Data,
  columns: Column[],
  fileName: string,
): Summary {
  const summary: Summary = {
    fileName,
    rowCount: data.length,
    columnCount: columns.length,
    numericalColumns: [],
    categoricalColumns: [],
  };

  columns.forEach((col) => {
    if (col.type === "numerical") {
      const values = data
        .map((row) => Number(row[col.name]))
        .filter((v) => !isNaN(v));
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const mean = sum / values.length;
        const sqDiffs = values.map((v) => Math.pow(v - mean, 2));
        const stdDev = Math.sqrt(
          sqDiffs.reduce((a, b) => a + b, 0) / values.length,
        );
        summary.numericalColumns.push({
          name: col.name,
          stats: {
            count: values.length,
            mean: parseFloat(mean.toFixed(2)),
            stdDev: parseFloat(stdDev.toFixed(2)),
            min: Math.min(...values),
            max: Math.max(...values),
          },
        });
      }
    } else {
      const values = data
        .map((row) => String(row[col.name]))
        .filter((v) => v && v !== "null" && v !== "undefined");
      const valueCounts: Record<string, number> = {};
      values.forEach((v) => {
        valueCounts[v] = (valueCounts[v] || 0) + 1;
      });
      const topValues = Object.fromEntries(
        Object.entries(valueCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5),
      );
      summary.categoricalColumns.push({
        name: col.name,
        stats: {
          uniqueCount: Object.keys(valueCounts).length,
          topValues,
        },
      });
    }
  });

  return summary;
}

export function createSummaryStringForAI(summary: Summary): string {
  let summaryString = `Data Summary for file: ${summary.fileName}\n`;
  summaryString += `Total rows: ${summary.rowCount}, Total columns: ${summary.columnCount}\n\n`;

  if (summary.numericalColumns.length > 0) {
    summaryString += "Numerical Columns:\n";
    summary.numericalColumns.forEach((col) => {
      summaryString += `- ${col.name}: count=${col.stats.count}, mean=${col.stats.mean}, stdDev=${col.stats.stdDev}, min=${col.stats.min}, max=${col.stats.max}\n`;
    });
    summaryString += "\n";
  }

  if (summary.categoricalColumns.length > 0) {
    summaryString += "Categorical Columns:\n";
    summary.categoricalColumns.forEach((col) => {
      const top = Object.entries(col.stats.topValues)
        .map(([key, value]) => `'${key}' (${value})`)
        .join(", ");
      summaryString += `- ${col.name}: uniqueCount=${col.stats.uniqueCount}, topValues=[${top}]\n`;
    });
  }
  return summaryString;
}

export function getChartData(summary: Summary): ChartData[] {
  return summary.categoricalColumns
    .map((col) => ({
      name: col.name,
      data: Object.entries(col.stats.topValues).map(([name, value]) => ({
        name,
        value,
      })),
    }))
    .filter((cd) => cd.data.length > 0);
}
