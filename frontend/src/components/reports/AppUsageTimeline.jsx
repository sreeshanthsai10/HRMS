import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AppUsageTimeline({ data = [] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            App Usage Timeline
          </h2>

          <div className="space-y-4">
            {data.map((hourData, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium">
                  {hourData.hour}:00
                </div>

                <div className="flex gap-2 flex-wrap">
                  {hourData.apps.map((app, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded-full ${
                        app.type === "productive"
                          ? "bg-emerald-100 text-emerald-600"
                          : app.type === "neutral"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {app.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}