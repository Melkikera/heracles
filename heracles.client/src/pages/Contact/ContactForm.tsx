import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, ROUTES } from '../../constants';

interface Props {
  contact?: any;
  onSaved?: (c: any) => void;
}

const ContactForm: React.FC<Props> = ({ contact, onSaved }) => {
  const [form, setForm] = useState({
    id: contact?.id ?? 0,
    email: contact?.email ?? '',
    telephone: contact?.telephone ?? '',
    mobile: contact?.mobile ?? '',
    postalAddress: contact?.postalAddress ?? '',
    facebook: contact?.facebook ?? '',
    linkedIn: contact?.linkedIn ?? '',
    instagram: contact?.instagram ?? '',
    schedulesJson: contact?.schedulesJson ?? '{}'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setForm({
      id: contact?.id ?? 0,
      email: contact?.email ?? '',
      telephone: contact?.telephone ?? '',
      mobile: contact?.mobile ?? '',
      postalAddress: contact?.postalAddress ?? '',
      facebook: contact?.facebook ?? '',
      linkedIn: contact?.linkedIn ?? '',
      instagram: contact?.instagram ?? '',
      schedulesJson: contact?.schedulesJson ?? '{}'
    });
    setErrorMessage(null);
    setValidationErrors({});
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setValidationErrors({});

    try {
      let res;
        if (form.id && form.id > 0) {
            res = await axios.put(ROUTES.ADM_CONTACTS + `/${form.id}`, form, { headers: { 'X-API-KEY': API_KEY } });
        } else {
            res = await axios.post(ROUTES.ADM_CONTACTS, form, { headers: { 'X-API-KEY': API_KEY } });
      }

      if (onSaved) onSaved(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (data && data.errors && typeof data.errors === 'object') {
          setValidationErrors(data.errors);
        } else if (data && (data.title || data.message)) {
          setErrorMessage(data.title || data.message);
        } else if (err.response && err.response.status) {
          setErrorMessage(`Erreur serveur (${err.response.status}).`);
        } else {
          setErrorMessage(err.message || 'Erreur lors de la sauvegarde.');
        }
      } else {
        setErrorMessage('Une erreur inattendue est survenue.');
      }
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // IDs added so modal and form controls can be targeted by tests or bootstrap JS
  const formId = form.id && form.id > 0 ? `contact-form-${form.id}` : 'contact-form-new';

  return (
    <form id={formId} onSubmit={handleSubmit} aria-live="polite">
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

      {Object.keys(validationErrors).length > 0 && (
        <div className="alert alert-danger" role="alert">
          <ul className="mb-0">
            {Object.entries(validationErrors).map(([field, msgs]) => msgs.map((m, i) => (
              <li key={`${field}-${i}`}>{field}: {m}</li>
            )))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor={`${formId}-email`} className="form-label">Email</label>
        <input id={`${formId}-email`} name="email" value={form.email} onChange={handleChange} className="form-control" type="email" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-telephone`} className="form-label">Téléphone</label>
        <input id={`${formId}-telephone`} name="telephone" value={form.telephone} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-mobile`} className="form-label">Mobile</label>
        <input id={`${formId}-mobile`} name="mobile" value={form.mobile} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-postalAddress`} className="form-label">Postal Address</label>
        <input id={`${formId}-postalAddress`} name="postalAddress" value={form.postalAddress} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-facebook`} className="form-label">Facebook</label>
        <input id={`${formId}-facebook`} name="facebook" value={form.facebook} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-linkedIn`} className="form-label">LinkedIn</label>
        <input id={`${formId}-linkedIn`} name="linkedIn" value={form.linkedIn} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-instagram`} className="form-label">Instagram</label>
        <input id={`${formId}-instagram`} name="instagram" value={form.instagram} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-schedulesJson`} className="form-label">Schedules (JSON)</label>
        <textarea id={`${formId}-schedulesJson`} name="schedulesJson" value={form.schedulesJson} onChange={handleChange} className="form-control" rows={4} />
      </div>

      <div className="d-flex justify-content-end">
        <button id={`${formId}-submit`} type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;