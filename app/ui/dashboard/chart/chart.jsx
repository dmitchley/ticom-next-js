"use client";

import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    visit: 9,
    click: 20,
  },
  {
    name: "Mon",
    visit: 4,
    click: 2,
  },
  {
    name: "Tue",
    visit: 11,
    click: 2,
  },
  {
    name: "Wed",
    visit: 40,
    click: 20,
  },
  {
    name: "Thu",
    visit: 4,
    click: 2,
  },
  {
    name: "Fri",
    visit: 2,
    click: 4,
  },
  {
    name: "Sat",
    visit: 30,
    click: 4,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[0, 50]} />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="click"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
