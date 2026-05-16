async function getContacts() {

  const res = await fetch(
    "https://taxin60sec-backend-production.up.railway.app/api/contact",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function AdminPage() {

  const contacts = await getContacts();

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

          <div className="bg-black text-white px-6 py-3 rounded-full">
            {contacts.length} Leads
          </div>

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