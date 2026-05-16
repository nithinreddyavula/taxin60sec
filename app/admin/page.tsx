"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {

  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const chartData = contacts.map((contact: any) => ({
    date: contact.createdAt
      ? new Date(contact.createdAt).toLocaleDateString()
      : "Old",
    leads: 1,
  }));

  useEffect(() => {

    const isAuthenticated =
      localStorage.getItem("admin-auth");

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetch(
      "https://taxin60sec-backend-production.up.railway.app/api/contact"
    )
      .then((res) => res.json())
      .then((data) => setContacts(data));

  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

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

          <button
            onClick={() => {
              localStorage.removeItem("admin-auth");
              router.push("/login");
            }}
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-8 rounded-[30px] shadow">

            <p className="text-gray-500">
              Total Leads
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {contacts.length}
            </h2>

          </div>

          <div className="bg-white p-8 rounded-[30px] shadow">

            <p className="text-gray-500">
              Today Leads
            </p>

            <h2 className="text-4xl font-bold mt-4">

              {
                contacts.filter((contact: any) => {

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
                .filter((contact: any) =>
                  contact.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((contact: any) => (

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

                          await fetch(
                            `https://taxin60sec-backend-production.up.railway.app/api/contact/${contact.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                          setContacts(
                            contacts.filter(
                              (c: any) => c.id !== contact.id
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

    </div>
  );
}