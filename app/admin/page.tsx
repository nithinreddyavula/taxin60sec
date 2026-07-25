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

  const chartData = contacts.map((contact) => ({
    date: contact.createdAt
      ? new Date(contact.createdAt).toLocaleDateString()
      : "Old",
    leads: 1,
  }));

  useEffect(() => {
    ContactService.list().then(setContacts).catch(() => setContacts([]));
    request<Record<string, number>>("/api/v1/admin/cases/dashboard").then(setMetrics).catch(() => setMetrics({}));
    request<AdminCaseSummary[]>("/api/v1/admin/cases")
      .then(setCases)
      .catch(() => setCases([]))
      .finally(() => setCasesLoading(false));
  }, []);

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

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
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

          <div className="bg-white p-8 rounded-[30px] shadow">

            <p className="text-gray-500">Open cases</p>

            <h2 className="text-4xl font-bold mt-4">
              {metrics.open ?? metrics.active ?? 0}
            </h2>

          </div>

          <div className="bg-white p-8 rounded-[30px] shadow">

            <p className="text-gray-500">
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

          <div className="bg-white p-8 rounded-[30px] shadow">

            <p className="text-gray-500">
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

        {/* CHART */}
        <div className="bg-white p-8 rounded-[30px] shadow mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Lead Analytics
          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={chartData}>

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="leads"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

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
              className="w-full p-5 rounded-2xl border border-gray-300 outline-none"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">

            {/* LIST */}
            <div className="bg-white rounded-[30px] shadow overflow-hidden">
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
                    <tr><td colSpan={6} className="p-6 text-center text-gray-500">Loading service requests...</td></tr>
                  )}
                  {!casesLoading && filteredCases.length === 0 && (
                    <tr><td colSpan={6} className="p-6 text-center text-gray-500">No service requests yet.</td></tr>
                  )}
                  {filteredCases.map((c) => (
                    <tr
                      key={c.caseId}
                      onClick={() => openCase(c.caseId)}
                      className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${selectedCase?.caseId === c.caseId ? "bg-blue-50" : ""}`}
                    >
                      <td className="p-5 font-mono text-sm text-gray-500">#{c.caseId}</td>
                      <td className="p-5 font-medium">{c.clientName}</td>
                      <td className="p-5 text-gray-600">{c.serviceName}</td>
                      <td className="p-5">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{c.status}</span>
                      </td>
                      <td className="p-5 text-gray-600 text-sm">{c.answeredQuestions}/{c.totalQuestions}</td>
                      <td className="p-5 text-gray-500 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DETAIL PANEL */}
            <div className="bg-white p-8 rounded-[30px] shadow">
              {!selectedCase && !detailLoading && !detailError && (
                <p className="text-gray-500">Select a client from the list to see their contact details and intake answers.</p>
              )}
              {detailLoading && <p className="text-gray-500">Loading client details...</p>}
              {detailError && <p className="text-red-500">{detailError}</p>}
              {selectedCase && !detailLoading && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Case #{selectedCase.caseId}</p>
                  <h3 className="text-2xl font-bold mt-1">{selectedCase.clientName}</h3>
                  <p className="text-gray-500 mt-1">{selectedCase.serviceName}</p>

                  <div className="mt-5 space-y-2 text-sm">
                    <p><span className="text-gray-400">Email: </span>{selectedCase.email || "Not provided"}</p>
                    <p><span className="text-gray-400">Phone: </span>{selectedCase.phone || "Not provided"}</p>
                    <p><span className="text-gray-400">Status: </span>{selectedCase.status}</p>
                    <p><span className="text-gray-400">Intake completed: </span>{selectedCase.intakeCompleted ? "Yes" : "No"}</p>
                  </div>

                  {selectedCase.intakeSummary && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">AI Summary</p>
                      <p className="text-sm text-gray-700">{selectedCase.intakeSummary}</p>
                    </div>
                  )}

                  {selectedCase.answers && Object.keys(selectedCase.answers).length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Intake Answers</p>
                      <div className="space-y-2">
                        {Object.entries(selectedCase.answers).map(([question, answer]) => (
                          <div key={question} className="border-b border-gray-100 pb-2">
                            <p className="text-xs text-gray-400">{question}</p>
                            <p className="text-sm text-gray-800">{answer}</p>
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

        {/* SEARCH */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-5 rounded-2xl border border-gray-300 outline-none"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[30px] shadow overflow-hidden">

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
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >

                    <td className="p-6 font-medium">
                      {contact.name}
                    </td>

                    <td className="p-6 text-gray-600">
                      {contact.email}
                    </td>

                    <td className="p-6 text-gray-700">
                      {contact.message}
                    </td>

                    <td className="p-6 text-gray-500">

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