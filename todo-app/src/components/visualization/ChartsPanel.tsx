//prosty panel do wyswietlania stworzonych chartow.import React from "react";

interface Props {
  children: React.ReactNode;
}

const ChartsPanel: React.FC<Props> = ({ children }) => {
  return (
    <div style={{
      padding: "20px",
      background: "#1e1e1e",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }}>
      <h2 style={{ color: "white" }}>📊 Wykresy</h2>
      {children}
    </div>
  );
};

export default ChartsPanel;