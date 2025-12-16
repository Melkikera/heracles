import React from 'react';

import ProductModalForm from './ProductModalForm';

interface Props {
  product?: any;
  onClose?: () => void;
  onSaved?: (c: any) => void | Promise<void>;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onSaved }) => {
  // Ne pas appeler onClose automatiquement — laisser le parent décider de fermer (après réussite)
  const handleSaved = (saved: any) => {
    if (onSaved) onSaved(saved);
  };
    console.log(product);
  const modalId = product ? `contact-modal-${product.id}` : 'productContact';

  return (
    <div className="modal show" id={modalId} tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? 'Edit Product' : 'Add Product'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
                  <div className="modal-body">
                      <ProductModalForm product={product} onSaved={handleSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
