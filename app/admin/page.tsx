"use client";

import { useEffect, useState } from "react";
import { ContactLead, ContactService } from "@/services/contact-service";
import AppShell from "@/components/AppShell";
import { request } from "@/services/client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AdminCaseSummary = {
  caseId: number;
  clientName: string;
  serviceName: string;
  status: string;
  intakeCompleted: boolean;
  answeredQuestions: number;
  totalQuestions: number;
  createdAt: string;
};

type AdminCaseDetail = {
  caseId: number;
  clientName: string;
  email: string;
  phone: string;
  serviceName: string;
  status: string;
  intakeCompleted: boolean;
  answers: Record<string, string>;
  intakeSummary: string;
};

export default function AdminPage() {

  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [search, setSearch] = useState("");
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  const [cases, setCases] = useState<AdminCaseSummary[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [caseSearch, setCaseSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<AdminCaseDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const [caList, setCaList] = useState<{ id: number; fullName: string; email: string }[]>([]);
  const [assigning, setAssigning] = useState(false);
  const [selectedCaId, setSelectedCaId] = useState("");

  const chartData = contacts.map((contact) => ({
    date: contact.createdAt
      ? new Date(contact.createdAt).toLocaleDateString()
      : "Old",
    leads: 1,
  }));

  const openCases =
    (metrics.intake ?? 0) +
    (metrics.documentCollection ?? 0) +
    (metrics.caReview ?? 0) +
    (metrics.inProgress ?? 0);

  useEffect(() => {
    ContactService.list().then(setContacts).catch(() => setContacts([]));
    request<Record<string, number>>("/api/v1/admin/cases/dashboard").then(setMetrics).catch(() => setMetrics({}));
    request<AdminCaseSummary[]>("/api/v1/admin/cases")
      .then(setCases)
      .catch(() => setCases([]))
      .finally(() => setCasesLoading(false));
    request<{ id: number; fullName: string; email: string }[]>("/api/v1/admin/cas")
      .then(setCaList)
      .catch(() => setCaList([]));
  }, []);

  async function assignCa(caseId: number) {
    if (!selectedCaId) return;
    setAssigning(true);
    try {
      await request(`/api/v1/admin/business-cases/${caseId}/assign`, "PUT", { caUserId: Number(selectedCaId) });
      setSelectedCase((prev) => (prev ? { ...prev, status: "CA_ASSIGNED" } : prev));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Unable to assign CA");
    } finally {
      setAssigning(false);
    }
  }

  async function openCase(caseId: number) {
    setDetailLoading(true);
    setDetailError("");
    setSelectedCase(null);
    try {
      const detail = await request<AdminCaseDetail>(`/api/v1/admin/cases/${caseId}`);
      setSelectedCase(detail);
    } catch (error) {
      setDetailError(error instanceof Error ? error.message : "Unable to load client details");
    } finally {
      setDetailLoading(false);
    }
  }

  const filteredCases = cases.filter((c) =>
    c.clientName.toLowerCase().includes(caseSearch.toLowerCase()) ||
    c.serviceName.toLowerCase().includes(caseSearch.toLowerCase())
  );

  return (
    <AppShell roles={["ROLE_ADMIN"]}><div className="">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-sm text-secondary">
              Admin Dashboard
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Client Inquiries
            </h1>

          </div>

          <p className="text-sm text-secondary">System overview and inquiry activity</p>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="card-dark p-8">

            <p className="text-secondary">Open cases</p>

            <h2 className="text-4xl font-bold mt-4">
              {openCases}
            </h2>

          </div>

          <div className="card-dark p-8">

            <p className="text-secondary">
              Today Leads
            </p>

            <h2 className="text-4xl font-bold mt-4">

              {
                contacts.filter((contact) => {

                  if (!contact.createdAt) return false;

                  const today =
                    new Date().toDateString();

                  const contactDate =
                    new Date(contact.createdAt).toDateString();

                  return today === contactDate;

                }).length
              }

            </h2>

          </div>

          <div className="card-dark p-8">

            <p className="text-secondary">
              Latest Lead
            </p>

            <h2 className="text-2xl font-bold mt-4">

              {
                contacts.length > 0
                  ? contacts[contacts.length - 1].name
                  : "No Leads"
              }

            </h2>

          </div>

        </div>

        {/* SERVICE REQUESTS (clients who asked for a service) */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Clients who requested a service</h2>
            <p className="text-sm text-secondary">{cases.length} total request{cases.length === 1 ? "" : "s"}</p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by client name or service..."
              value={caseSearch}
              onChange={(e) => setCaseSearch(e.target.value)}
              className="w-full p-5 rounded-2xl border border-white/15 bg-white/[.03] text-white placeholder:text-slate-500 outline-none"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">

            {/* LIST */}
            <div className="card-dark overflow-hidden">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left p-5">Case ID</th>
                    <th className="text-left p-5">Client</th>
                    <th className="text-left p-5">Service</th>
                    <th className="text-left p-5">Status</th>
                    <th className="text-left p-5">Intake</th>
                    <th className="text-left p-5">Requested</th>
                  </tr>
                </thead>
                <tbody>
                  {casesLoading && (
                    <tr><td colSpan={6} className="p-6 text-center text-secondary">Loading service requests...</td></tr>
                  )}
                  {!casesLoading && filteredCases.length === 0 && (
                    <tr><td colSpan={6} className="p-6 text-center text-secondary">No service requests yet.</td></tr>
                  )}
                  {filteredCases.map((c) => (
                    <tr
                      key={c.caseId}
                      onClick={() => openCase(c.caseId)}
                      className={`border-b border-white/10 hover:bg-white/5 cursor-pointer ${selectedCase?.caseId === c.caseId ? "bg-blue-500/10" : ""}`}
                    >
                      <td className="p-5 font-mono text-sm text-secondary">#{c.caseId}</td>
                      <td className="p-5 font-medium">{c.clientName}</td>
                      <td className="p-5 text-secondary">{c.serviceName}</td>
                      <td className="p-5">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{c.status}</span>
                      </td>
                      <td className="p-5 text-secondary text-sm">{c.answeredQuestions}/{c.totalQuestions}</td>
                      <td className="p-5 text-secondary text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DETAIL PANEL */}
            <div className="card-dark p-8">
              {!selectedCase && !detailLoading && !detailError && (
                <p className="text-secondary">Select a client from the list to see their contact details and intake answers.</p>
              )}
              {detailLoading && <p className="text-secondary">Loading client details...</p>}
              {detailError && <p className="text-red-500">{detailError}</p>}
              {selectedCase && !detailLoading && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary font-bold">Case #{selectedCase.caseId}</p>
                  <h3 className="text-2xl font-bold mt-1">{selectedCase.clientName}</h3>
                  <p className="text-secondary mt-1">{selectedCase.serviceName}</p>

                  <div className="mt-5 space-y-2 text-sm">
                    <p><span className="text-secondary">Email: </span>{selectedCase.email || "Not provided"}</p>
                    <p><span className="text-secondary">Phone: </span>{selectedCase.phone || "Not provided"}</p>
                    <p><span className="text-secondary">Status: </span>{selectedCase.status}</p>
                    <p><span className="text-secondary">Intake completed: </span>{selectedCase.intakeCompleted ? "Yes" : "No"}</p>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Assign to CA</p>
                    <div className="flex gap-2">
                      <select
                        value={selectedCaId}
                        onChange={(e) => setSelectedCaId(e.target.value)}
                        className="flex-1 rounded-lg border border-white/15 bg-white/[.03] p-2 text-sm text-white"
                      >
                        <option value="">Select a CA...</option>
                        {caList.map((ca) => (
                          <option key={ca.id} value={ca.id}>{ca.fullName} ({ca.email})</option>
                        ))}
                      </select>
                      <button
                        onClick={() => assignCa(selectedCase.caseId)}
                        disabled={!selectedCaId || assigning}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                      >
                        {assigning ? "Assigning..." : "Assign"}
                      </button>
                    </div>
                    {caList.length === 0 && (
                      <p className="mt-2 text-xs text-secondary">No CA accounts found — create a user with the CA role first.</p>
                    )}
                  </div>

                  {selectedCase.intakeSummary && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">AI Summary</p>
                      <p className="text-sm text-slate-300">{selectedCase.intakeSummary}</p>
                    </div>
                  )}

                  {selectedCase.answers && Object.keys(selectedCase.answers).length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Intake Answers</p>
                      <div className="space-y-2">
                        {Object.entries(selectedCase.answers).map(([question, answer]) => (
                          <div key={question} className="border-b border-white/8 pb-2">
                            <p className="text-xs text-secondary">{question}</p>
                            <p className="text-sm text-white">{answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* CHART */}
        <div className="card-dark p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Lead Analytics
          </h2>

          {chartData.length === 0 ? (
            <p className="text-secondary text-sm">No lead activity yet — the chart will populate once inquiries come in.</p>
          ) : (
            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={chartData}>

                  <XAxis dataKey="date" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="leads"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>
          )}

        </div>

        {/* SEARCH */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-5 rounded-2xl border border-white/15 bg-white/[.03] text-white placeholder:text-slate-500 outline-none"
          />

        </div>

        {/* TABLE */}
        <div className="card-dark overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>
                <th className="text-left p-6">Name</th>
                <th className="text-left p-6">Email</th>
                <th className="text-left p-6">Message</th>
                <th className="text-left p-6">Created</th>
                <th className="text-left p-6">Action</th>
              </tr>

            </thead>

            <tbody>

              {contacts
                .filter((contact) =>
                  contact.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((contact) => (

                  <tr
                    key={contact.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >

                    <td className="p-6 font-medium">
                      {contact.name}
                    </td>

                    <td className="p-6 text-secondary">
                      {contact.email}
                    </td>

                    <td className="p-6 text-slate-300">
                      {contact.message}
                    </td>

                    <td className="p-6 text-secondary">

                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : "Old Record"}

                    </td>

                    <td className="p-6">

                      <button
                        onClick={async () => {

                          await ContactService.remove(contact.id);

                          setContacts(
                            contacts.filter(
                              (c) => c.id !== contact.id
                            )
                          );
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div></AppShell>
  );
}