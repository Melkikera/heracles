import React from 'react';
import { createPortal } from 'react-dom';
import ContactForm from './ContactForm';
import './contact.css';
import Modal from 'react-bootstrap/Modal';

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

    console.log('Contact modal !')
  const modal = (
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form</Modal.Title>              
          </Modal.Header>
        <Modal.Body>
              <ContactForm initialContact={contact} onSaved={handleSaved} />
          </Modal.Body>
        
    </Modal>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modal, document.body);
  }

  return modal;
};

export default ContactModal;
