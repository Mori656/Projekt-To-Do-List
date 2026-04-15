// NoiseChart.tsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import type { SensorData } from "../types";

interface Props {
  data: SensorData[];
}


const NoiseChart: React.FC<Props> = ({ data }) => {

  const metricsMap = {
    LAeq: 0,
    LAFmax: 1,
    LAFmin: 2,
    L10: 3,
    L50: 4,
    L90: 5,
    LCpeak: 6
  };
  const [metric, setMetric] = useState<keyof typeof metricsMap>("LAeq");
  
  const formattedData = data.map(d => ({
    time: new Date(d.t).toLocaleTimeString(),
    value: d.m_std[metricsMap[metric]]
  }));



  return (
    <div style={{
      background: "#2a2a2a",
      padding: "15px",
      borderRadius: "10px"
    }}>
      <h3 style={{ color: "white" }}>Wartości w czasie</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00ff9f" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {Object.keys(metricsMap).map((m) => (
          <button key={m} onClick={() => setMetric(m as any)}>
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoiseChart;