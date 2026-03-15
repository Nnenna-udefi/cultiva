import { getChartData, Summary } from "@/lib/data";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BarChartIcon } from "lucide-react";

interface SummaryChartsProps {
  summary: Summary;
}

export function SummaryCharts({ summary }: SummaryChartsProps) {
  const chartData = useMemo(() => getChartData(summary), [summary]);

  if (chartData.length === 0) {
    return (
      <Alert>
        <BarChartIcon className="h-4 w-4" />
        <AlertTitle>No Visualizations</AlertTitle>
        <AlertDescription>
          No categorical data columns with multiple values were found to
          generate charts.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <CardTitle className="font-headline text-lg">Visualizations</CardTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {chartData.map((chart) => (
          <Card key={chart.name}>
            <CardHeader>
              <CardTitle className="font-headline text-base">
                Top 5 Values for &quot;{chart.name}&quot;
              </CardTitle>
              <CardDescription>
                Frequency of the most common values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart
                  data={chart.data}
                  layout="vertical"
                  margin={{ left: 10, right: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    width={80}
                    tickFormatter={(value) =>
                      value.length > 10 ? `${value.substring(0, 10)}...` : value
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "var(--secondary)" }}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    name="Count"
                    fill="var(--primary)"
                    radius={[0, 4, 4, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
