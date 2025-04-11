import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card,CardContent } from "./ui/card"

interface Commit  {
 commitsArray:{
  date: string
  count: number
 }[]
}



const CommitChart:React.FC<Commit>=({commitsArray}) =>{
  
  const data = [...commitsArray].sort(
    (a, b) =>
      new Date(a.date.split("-").reverse().join("-")).getTime() -
      new Date(b.date.split("-").reverse().join("-")).getTime()
  )

  return (
    <Card className="bg-black text-white w-full max-w-4xl mx-auto border-none">
      <CardContent className="p-6">
        <h2 className="md:text-4xl text-2xl font-semibold mb-4">Commits by Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
          <XAxis
              dataKey="date"
              stroke="#ccc"
              tick={{ fill: "#ccc", fontSize: 12 }}
            />
            <YAxis
              stroke="#ccc"
              tick={{ fill: "#ccc", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              labelStyle={{ color: "#60a5fa" }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Bar
              dataKey="count"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
export default  CommitChart;