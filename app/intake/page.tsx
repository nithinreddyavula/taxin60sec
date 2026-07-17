"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";

type Service = { id: number; displayName: string; intakeQuestions: string[] };
type Page<T> = { content: T[] };
type Intake = { taxCase: { id: number; intakeSummary?: string }; questions: string[]; answers: Record<string, string>; missingDocuments: { name: string }[] };

export default function IntakePage() {
  const [serviceId, setServiceId] = useState(""); const [services, setServices] = useState<Service[]>([]); const [intake, setIntake] = useState<Intake | null>(null); const [answers, setAnswers] = useState<Record<string, string>>({}); const [message, setMessage] = useState("");
  const token = typeof window === "undefined" ? "" : localStorage.getItem("tax60-access-token") ?? "";
  async function loadServices() { try { const page = await api<Page<Service>>("/api/v1/services?active=true"); setServices(page.content); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to load services"); } }
  async function start() { try { const result = await api<Intake>("/api/v1/intake/cases", { method: "POST", body: JSON.stringify({ serviceOfferingId: Number(serviceId) }) }, token); setIntake(result); setAnswers(result.answers); } catch (error) { setMessage(error instanceof Error ? error.message : "Please sign in before starting intake"); } }
  async function submit(event: FormEvent) { event.preventDefault(); if (!intake) return; try { const result = await api<Intake>(`/api/v1/intake/cases/${intake.taxCase.id}/answers`, { method: "POST", body: JSON.stringify({ answers: Object.entries(answers).map(([question, answer]) => ({ question, answer })), complete: true }) }, token); setIntake(result); setMessage("Your details were saved. Upload the requested documents through your case portal."); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save intake"); } }
  return <main className="min-h-screen bg-[#020817] px-6 py-16 text-white"><div className="mx-auto max-w-2xl"><h1 className="text-3xl font-bold">Start your Tax60 case</h1><p className="mt-3 text-secondary">Select the same service you discussed on WhatsApp. Sign in first so Tax60 can resume your case securely.</p>{!services.length && <button className="btn-primary mt-6" onClick={loadServices}>Load services</button>}{services.length > 0 && !intake && <div className="mt-6 space-y-3"><select className="input-dark w-full p-3" value={serviceId} onChange={(e) => setServiceId(e.target.value)}><option value="">Choose a service</option>{services.map((service) => <option key={service.id} value={service.id}>{service.displayName}</option>)}</select><button disabled={!serviceId} className="btn-primary" onClick={start}>Continue</button></div>}{intake && <form className="mt-8 space-y-4" onSubmit={submit}>{intake.questions.map((question) => <label key={question} className="block"><span className="text-sm font-semibold">{question}</span><textarea required className="input-dark mt-2 w-full p-3" value={answers[question] ?? ""} onChange={(e) => setAnswers({ ...answers, [question]: e.target.value })} /></label>)}<button className="btn-primary">Save and request documents</button></form>}{message && <p className="mt-5 text-sm text-blue-300">{message}</p>}</div></main>;
}
