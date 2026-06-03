import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState.jsx";

const RatingsChart = ({ data }) => {
  const totalCount = (data || []).reduce((sum, entry) => sum + entry.count, 0);

  if (!data || data.length === 0 || totalCount === 0) {
    return (
      <EmptyState
        title="No rated books"
        message="Your saved books with star ratings will appear here."
      />
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
          <XAxis
            dataKey="rating"
            tick={{ fontSize: 12, fill: "#6B5C58" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(212, 175, 55, 0.2)" }}
          />
          <YAxis
            allowDecimals={false}
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
            cursor={{ fill: "rgba(212, 175, 55, 0.05)" }}
          />
          <Bar dataKey="count" fill="#D4AF37" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingsChart;


