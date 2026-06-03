import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import EmptyState from "../ui/EmptyState.jsx";

const COLORS = ["#FFB8D4", "#A8D4B8", "#FFE8A0", "#C4B0FF", "#FFB898", "#D4AF37"];

const GenreChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No genres yet"
        message="Save books to see genre breakdown"
      />
    );
  }

  return (
    <div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-charcoal-700 dark:text-cream-200">{entry.name}</span>
            <span className="text-xs font-bold text-charcoal-500 dark:text-cream-300">({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreChart;


