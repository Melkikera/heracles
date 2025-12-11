import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactModal from '../Contact/ContactModal';
import { API_KEY } from '../../constants';

const ContactsAdmin: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);
  const load = async () => {
      try {
          const res = await axios.get('/api/admin/contacts', { headers: { 'X-API-KEY': API_KEY } });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this contact?')) return;
      await axios.delete(`/api/admin/contacts/${id}`, { headers: { 'X-API-KEY': API_KEY } });
    load();
  };

  const handleEdit = (c: any) => {
    setEditing(c);
    setShowModal(true);
  };

    const handleAdd = () => {
        console.log('Adding new contact');
    setEditing(null);
    setShowModal(true);
  };

  return (
    <div>
      <h1>Contacts (admin)</h1>
      <button className="btn btn-primary" onClick={handleAdd}>Add Contact</button>
      <table className="table table-striped mt-3">
        <thead>
          <tr><th>Email</th><th>Telephone</th><th>Mobile</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td>{c.email}</td>
              <td>{c.telephone}</td>
              <td>{c.mobile}</td>
              <td>
                <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <ContactModal contact={editing} onClose={() => { setShowModal(false); load(); }} onSaved={() => { setShowModal(false); load(); }} />}
    </div>
  );
};

export default ContactsAdmin;
