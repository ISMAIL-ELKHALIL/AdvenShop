import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useGetProductCountByCategoryQuery } from "../../slices/productsApiSlice";


// Define an array of colors for the pie chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function PieChartBox() {

  const { data: categories, isLoading, isError } = useGetProductCountByCategoryQuery();
  console.log("categories", categories)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !categories) {
    return <div>Error occurred</div>;
  }

  const data = categories.map(category => ({
    value: category.count,
    name: category.name,
  }));


  return (
    <div className="pieChartBox">
      <h1>Categories</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              fill="#8884d8"
            >
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
