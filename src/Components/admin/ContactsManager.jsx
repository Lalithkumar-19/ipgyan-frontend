import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'contact_submissions';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    // Ensure status exists
    const normalized = data.map(x => ({ status: 'New', ...x }));
    setContacts(normalized);
  }, []);

  const updateStatus = (id, status) => {
    const next = contacts.map(c => c.id === id ? { ...c, status } : c);
    setContacts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id} className="border-b">
              <td className="p-2 border align-top">{c.fullName}</td>
              <td className="p-2 border align-top">{c.email}</td>
              <td className="p-2 border align-top">{c.phone}</td>
              <td className="p-2 border align-top">{c.subject}</td>
              <td className="p-2 border align-top whitespace-pre-wrap">{c.message}</td>
              <td className="p-2 border align-top">
                <select value={c.status} onChange={(e) => updateStatus(c.id, e.target.value)} className="border rounded px-2 py-1">
                  <option>New</option>
                  <option>In Review</option>
                  <option>Resolved</option>
                </select>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">No contact submissions yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsManager;
