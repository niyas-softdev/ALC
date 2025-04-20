import { useEffect, useState } from "react";
import axios from "axios";

const ContactUsController = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const fetchContactMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5174/api/contact/get");
      // Your backend returns a direct array, so no .contact needed
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("Failed to fetch contact messages:", err);
      setError("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">📨 Contact Messages (Admin View)</h2>

        {loading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-600">No contact messages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white border border-pink-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-pink-800">{contact.name}</h3>
                  <span className="text-sm text-gray-400">
                    {new Date(contact.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-pink-600 mb-1">{contact.email}</p>
                <p className="text-gray-700">{contact.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsController;
