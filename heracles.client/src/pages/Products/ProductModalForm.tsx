import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY,ROUTES } from '../../constants';

interface Props {
    product?: any;
    onClose?: () => void;
  onSaved?: (c: any) => void;
}

const ProductModalForm: React.FC<Props> = ({ product, onSaved }) => {
  const [form, setForm] = useState({
    id: product?.id ?? 0,
    name: product?.name ?? '',
    price: product?.price ?? ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setForm({
        id: product?.id ?? 0,
        name: product?.name ?? '',
        price: product?.price ?? '',
    });
    setErrorMessage(null);
    setValidationErrors({});
  }, [product]);

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
            res = await axios.put(ROUTES.PRODUCTS + `/${form.id}`, form, { headers: { 'X-API-KEY': API_KEY } });
      } else {
            res = await axios.post(ROUTES.PRODUCTS, form, { headers: { 'X-API-KEY': API_KEY } });
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
  const formId = form.id && form.id > 0 ? `product-form-${form.id}` : 'product-form-new';

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
        <label htmlFor={`${formId}-name`} className="form-label">Name</label>
        <input id={`${formId}-name`} name="name" value={form.name} onChange={handleChange} className="form-control" type="text" />
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-price`} className="form-label">Prix</label>
        <input id={`${formId}-price`} name="price" value={form.price} onChange={handleChange} className="form-control" type="number"/>
      </div>

      

      <div className="d-flex justify-content-end">
        <button id={`${formId}-submit`} type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProductModalForm;