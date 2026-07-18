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

export default function AdminPage() {

  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [search, setSearch] = useState("");
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  const chartData = contacts.map((contact) => ({
    date: contact.createdAt
      ? new Date(contact.createdAt).toLocaleDateString()
      : "Old",
    leads: 1,
  }));

  useEffect(() => {
    ContactService.list().then(setContacts).catch(() => setContacts([]));
    request<Record<string, number>>("/api/v1/admin/cases/dashboard").then(setMetrics).catch(() => setMetrics({}));
  }, []);

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
