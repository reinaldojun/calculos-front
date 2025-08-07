"use client";
import { useEffect, useState } from "react";
import { getCalculos } from "./Api";
import { parsePossibleDate } from "../lib/helpers";

export default function ResultsTable() {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  async function fetchPage(p: number) {
    try {
      const res = await getCalculos(p, size);
      setData(res);
    } catch (e) {
      console.error(e);
      setData(null);
    }
  }

  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Id</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Data Admissão</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Salário</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Anos</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((row: any) => (
            <tr key={row.id}>
              <td style={{ padding: "8px 0" }}>{row.id}</td>
              <td style={{ padding: "8px 0" }}>{parsePossibleDate(row.dataAdmissao)}</td>
              <td style={{ padding: "8px 0" }}>{row.salarioBruto}</td>
              <td style={{ padding: "8px 0" }}>{row.anos ?? ""}</td>
              <td style={{ padding: "8px 0" }}>{parsePossibleDate(row.criadoEm)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
        <span style={{ margin: "0 8px" }}>Página {page + 1}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={data.totalPages !== undefined && page + 1 >= data.totalPages}>Next</button>
      </div>
    </div>
  );
}