import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function IdleTimeAlerts({ data = [] }) {
  if (!data.length) return null;

  return (
    <Card className="rounded-2xl shadow-sm border-red-200">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
          <AlertTriangle size={20} />
          Extended Idle Alerts
        </h2>

        {data.map((item, index) => (
          <div key={index} className="text-sm">
            {item.employee} idle for{" "}
            <span className="font-semibold text-red-600">
              {item.idleMinutes} minutes
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}