import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState.jsx";

const ReadingTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No activity yet"
        message="Log reading sessions to see your trend"
      />
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="readingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#6B5C58" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(212, 175, 55, 0.2)" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6B5C58" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(252, 249, 242, 0.95)",
              border: "1.5px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "16px",
              fontSize: "12px",
              color: "#1A1412",
              boxShadow: "0 8px 24px rgba(212, 175, 55, 0.08)",
            }}
          />
          <Area
            type="monotone"
            dataKey="pages"
            stroke="#D4AF37"
            strokeWidth={3}
            fill="url(#readingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReadingTrendChart;


