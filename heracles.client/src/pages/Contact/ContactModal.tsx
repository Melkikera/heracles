import React from 'react';
import ContactForm from './ContactForm';

interface Props {
  contact?: any;
  onClose?: () => void;
  onSaved?: (c: any) => void | Promise<void>;
}

const ContactModal: React.FC<Props> = ({ contact, onClose, onSaved }) => {
  // Ne pas appeler onClose automatiquement — laisser le parent décider de fermer (après réussite)
  const handleSaved = (saved: any) => {
    if (onSaved) onSaved(saved);
  };

  const modalId = contact ? `contact-modal-${contact.id}` : 'modalContact';

  return (
    <div className="modal show" id={modalId} tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{contact ? 'Edit Contact' : 'Add Contact'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <ContactForm contact={contact} onSaved={handleSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
