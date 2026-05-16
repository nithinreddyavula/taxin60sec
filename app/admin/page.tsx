"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

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

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-5 rounded-2xl border border-gray-300 outline-none"
          />

        </div>

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