import React from 'react';
import { createPortal } from 'react-dom';
import ContactForm from './ContactForm';
import './contact.css';

interface ContactModalProps {
  onClose: () => void;
  contact?: any;
  onSaved?: (c: any) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, contact, onSaved }) => {
  const handleSaved = (saved: any) => {
    if (onSaved) onSaved(saved);
    onClose();
  };

  const modal = (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>Contact Form</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <ContactForm initialContact={contact} onSaved={handleSaved} />
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modal, document.body);
  }

  return modal;
};

export default ContactModal;
