import { useState } from 'react';
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

  return (
    <form onSubmit={submit} className="contact-form">
      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={onChange} required />

      <label>Téléphone</label>
      <input type="tel" name="telephone" value={form.telephone} onChange={onChange} />

      <label>Mobile</label>
      <input type="tel" name="mobile" value={form.mobile} onChange={onChange} />

      <label>Postal address</label>
      <textarea name="postal" rows={3} value={form.postal} onChange={onChange}></textarea>

      <label>Facebook</label>
      <input name="facebook" value={form.facebook} onChange={onChange} placeholder="https://facebook.com/yourpage" />

      <label>LinkedIn</label>
      <input name="linkedin" value={form.linkedin} onChange={onChange} placeholder="https://linkedin.com/in/yourprofile" />

      <label>Instagram</label>
      <input name="instagram" value={form.instagram} onChange={onChange} placeholder="https://instagram.com/yourprofile" />

      <div className="social-icons-preview">
        {form.facebook && (
          <a className="social-link" href={form.facebook} target="_blank" rel="noreferrer noopener" aria-label="Facebook">
            <FacebookIcon />
          </a>
        )}
      </div>

      <h3>Schedules</h3>
      {Object.keys(form.schedules).map((day) => (
        <div key={day} className="schedule-row">
          <label>{day}</label>
          <input value={form.schedules[day]} onChange={(e) => setForm(prev => ({ ...prev, schedules: { ...prev.schedules, [day]: e.target.value } }))} />
        </div>
      ))}

      <button type="submit" className="btn">Send</button>
    </form>
  );
}
