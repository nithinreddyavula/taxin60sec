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

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Client Inquiries
        </h1>

        <div className="bg-white rounded-3xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>
                <th className="text-left p-5">Name</th>
                <th className="text-left p-5">Email</th>
                <th className="text-left p-5">Message</th>
              </tr>

            </thead>

            <tbody>

              {contacts.map((contact: any) => (

                <tr
                  key={contact.id}
                  className="border-b border-gray-200"
                >
                  <td className="p-5">{contact.name}</td>
                  <td className="p-5">{contact.email}</td>
                  <td className="p-5">{contact.message}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}