import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8081";

export async function postCalculo(payload: any) {
  const res = await axios.post(`${base}/api/calculos`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function getCalculos(page = 0, size = 10) {
  const res = await axios.get(`${base}/api/calculos?page=${page}&size=${size}`);
  return res.data;
}

export async function getCalculosPorData(inicio: string, fim: string, page = 0, size = 10, sort = "criadoEm,desc") {
  const params = new URLSearchParams({ inicio, fim, page: String(page), size: String(size), sort });
  const res = await axios.get(`${base}/api/calculos/por-data?${params.toString()}`);
  return res.data;
}