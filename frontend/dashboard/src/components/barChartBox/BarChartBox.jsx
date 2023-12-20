import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./barChartBox.scss"

export default function BarChartBox(props) {


  return (
      <div className="barChartBox">
        <h1>{props.title}</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height={240}>
        <BarChart  data={props.chartData}>
          <Tooltip
          contentStyle={{ background: "#2a3447", borderRadius: "4px", border:"none"}}
          labelStyle={{display: "none"}}
          cursor={{fill:"none"}}
          />
          <Bar dataKey={props.dataKey} fill={props.color} />
        </BarChart>
      </ResponsiveContainer>
        </div>
      </div>
  );
}
