import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TeamProductivityComparison({
  data = [],
  loading,
  error,
}) {
  if (loading) return <Card><CardContent className="p-6">Loading...</CardContent></Card>;
  if (error) return <Card><CardContent className="p-6 text-red-500">Failed to load</CardContent></Card>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Team Productivity Comparison
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar
                  dataKey="productivity"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}