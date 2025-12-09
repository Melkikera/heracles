import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contact.css';

interface ContactDto {
  id?: number;
  email?: string;
  telephone?: string;
  mobile?: string;
  postalAddress?: string;
  facebook?: string;
  linkedIn?: string;
  instagram?: string;
  schedulesJson?: string;
  isMine?: boolean;
}

interface ContactFormProps {
  initialContact?: ContactDto;
  onSaved?: (c: ContactDto) => void;
}

interface FormState {
  email: string;
  telephone: string;
  mobile: string;
  postal: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  schedules: { [day: string]: string };
}

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M15 8h2V5h-2c-1.104 0-2 .896-2 2v1H11v3h2v7h3v-7h2.237L19 11h-2v-1c0-.551.449-1 1-1z" fill="currentColor" />
  </svg>
);

function makeInitial(contact?: ContactDto): FormState {
  return {
    email: contact?.email || '',
    telephone: contact?.telephone || '',
    mobile: contact?.mobile || '',
    facebook: contact?.facebook || '',
    linkedin: contact?.linkedIn || '',
    instagram: contact?.instagram || '',
    postal: contact?.postalAddress || '',
    schedules: contact?.schedulesJson ? (JSON.parse(contact.schedulesJson) as { [k: string]: string }) : {
      Monday: '9:00 - 17:00',
      Tuesday: '9:00 - 17:00',
      Wednesday: '9:00 - 17:00',
      Thursday: '9:00 - 17:00',
      Friday: '9:00 - 17:00'
    }
  };
}

export default function ContactForm({ initialContact, onSaved }: ContactFormProps) {
  // initialize from initialContact; parent should remount this component when initialContact changes (pass key)
  const [form, setForm] = useState<FormState>(() => makeInitial(initialContact));

  useEffect(() => {
    setForm(() => makeInitial(initialContact));
  }, [initialContact]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value } as unknown as FormState));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        Email: form.email,
        Telephone: form.telephone,
        Mobile: form.mobile,
        PostalAddress: form.postal,
        Facebook: form.facebook,
        LinkedIn: form.linkedin,
        Instagram: form.instagram,
        SchedulesJson: JSON.stringify(form.schedules)
      };

      let res;
      if (initialContact && initialContact.id) {
        res = await axios.put(`/api/admin/contacts/${initialContact.id}`, payload);
      } else {
        res = await axios.post('/api/admin/contacts', payload);
      }

      alert('Contact saved');
      if (onSaved) onSaved(res.data || {});
    } catch (error) {
      console.error(error);
      alert('Failed to save contact');
    }
  };

  // IDs added so modal and form controls can be targeted by tests or bootstrap JS
  const formId = form.id && form.id > 0 ? `contact-form-${form.id}` : 'contact-form-new';

  return (
    <form id={formId} onSubmit={submit} className="contact-form">
      <div className="mb-3">
        <label htmlFor={`${formId}-email`} className="form-label">Email</label>
        <input id={`${formId}-email`} type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-telephone`} className="form-label">Téléphone</label>
        <input id={`${formId}-telephone`} type="tel" name="telephone" value={form.telephone} onChange={onChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-mobile`} className="form-label">Mobile</label>
        <input id={`${formId}-mobile`} type="tel" name="mobile" value={form.mobile} onChange={onChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-postalAddress`} className="form-label">Postal Address</label>
        <input id={`${formId}-postalAddress`} name="postal" value={form.postal} onChange={onChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-facebook`} className="form-label">Facebook</label>
        <input id={`${formId}-facebook`} name="facebook" value={form.facebook} onChange={onChange} className="form-control" placeholder="https://facebook.com/yourpage" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-linkedIn`} className="form-label">LinkedIn</label>
        <input id={`${formId}-linkedIn`} name="linkedin" value={form.linkedin} onChange={onChange} className="form-control" placeholder="https://linkedin.com/in/yourprofile" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-instagram`} className="form-label">Instagram</label>
        <input id={`${formId}-instagram`} name="instagram" value={form.instagram} onChange={onChange} className="form-control" placeholder="https://instagram.com/yourprofile" />
      </div>

      <div className="social-icons-preview">
        {form.facebook && (
          <a className="social-link" href={form.facebook} target="_blank" rel="noreferrer noopener" aria-label="Facebook">
            <FacebookIcon />
          </a>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-schedulesJson`} className="form-label">Schedules (JSON)</label>
        <textarea id={`${formId}-schedulesJson`} name="schedulesJson" value={form.schedulesJson} onChange={onChange} className="form-control" rows={4}></textarea>
      </div>

      <div className="d-flex justify-content-end">
        <button id={`${formId}-submit`} type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}
