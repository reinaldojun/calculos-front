"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postCalculo } from "./Api";

const calculoSchema = z.object({
  dataAdmissao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use o formato yyyy-MM-dd" }),
  salarioBruto: z.preprocess((v) => (typeof v === "string" ? Number(v) : v), z.number().min(0, "Salário deve ser >= 0")),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, { message: "CEP inválido. Formato: 12345-678 ou 12345678" }),
});

type FormData = z.infer<typeof calculoSchema>;

export default function CalculoForm() {
  const [apiResult, setApiResult] = useState<any | null>(null);
  const [apiErrors, setApiErrors] = useState<string[] | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(calculoSchema),
  });

  async function onSubmit(data: FormData) {
    setApiErrors(null);
    setApiResult(null);
    try {
      const res = await postCalculo(data);
      setApiResult(res);
      reset();
    } catch (err: any) {
      if (err.response?.data?.messages) {
        setApiErrors(err.response.data.messages);
      } else if (err.response?.data) {
        setApiErrors([JSON.stringify(err.response.data)]);
      } else {
        setApiErrors([err.message || "Erro desconhecido"]);
      }
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 12 }}>
          <label>Data de Admissão (yyyy-MM-dd)</label><br />
          <input {...register("dataAdmissao")} placeholder="2022-05-10" />
          <div style={{ color: "red" }}>{errors.dataAdmissao?.message as string}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Salário Bruto</label><br />
          <input {...register("salarioBruto")} placeholder="3500" />
          <div style={{ color: "red" }}>{errors.salarioBruto?.message as string}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>CEP</label><br />
          <input {...register("cep")} placeholder="66050080 ou 66050-080" />
          <div style={{ color: "red" }}>{errors.cep?.message as string}</div>
        </div>

        <button type="submit" disabled={isSubmitting}>Calcular</button>
      </form>

      {apiErrors && (
        <div style={{ marginTop: 16 }}>
          <h4>Erros da API:</h4>
          <ul>
            {apiErrors.map((m, i) => (<li key={i}>{m}</li>))}
          </ul>
        </div>
      )}

      {apiResult && (
        <div style={{ marginTop: 16 }}>
          <h4>Resultado:</h4>
          <pre style={{ background: "#f6f6f6", padding: 12 }}>{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}