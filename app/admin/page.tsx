"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

  const [contacts, setContacts] = useState([]);

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

        <div className="bg-white rounded-[30px] shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>
                <th className="text-left p-6">Name</th>
                <th className="text-left p-6">Email</th>
                <th className="text-left p-6">Message</th>
              </tr>

            </thead>

            <tbody>

              {contacts.map((contact: any) => (

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

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}