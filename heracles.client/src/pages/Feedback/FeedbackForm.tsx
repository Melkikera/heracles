import React, { useState, useEffect } from 'react';
import type { Feedback, FeedbackCreate } from '../../types/feedback';

interface FeedbackFormProps {
  item?: Feedback;
  onSubmit: (data: FeedbackCreate) => void;
  onCancel: () => void;
  backlogItems?: { id: number; title: string }[];
}

export function FeedbackForm({ item, onSubmit, onCancel, backlogItems = [] }: FeedbackFormProps) {
  const [backlogItemId, setBacklogItemId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState<'direct' | 'support' | 'sale' | 'other'>('direct');
  const [status, setStatus] = useState<'new' | 'linked' | 'ignored'>('new');

  useEffect(() => {
    if (item) {
      setBacklogItemId(item.backlogItemId);
      setTitle(item.title);
      setDescription(item.description);
      setSource(item.source);
      setStatus(item.status);
    } else {
      setBacklogItemId(undefined);
      setTitle('');
      setDescription('');
      setSource('direct');
      setStatus('new');
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      backlogItemId,
      title,
      description,
      source,
      status,
      createdBy: {
        email: 'admin@example.com', // Remplacez par l'email de l'utilisateur connecté si disponible
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {backlogItems.length > 0 && (
        <div className="form-group">
          <label htmlFor="backlogItem">Link to Backlog Item (optional)</label>
          <select
            id="backlogItem"
            value={backlogItemId || 0}
            onChange={(e) => setBacklogItemId(Number(e.target.value) || undefined)}
          >
            <option value={0}>No link</option>
            {backlogItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="source">Source</label>
        <select
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value as 'direct' | 'support' | 'sale' | 'other')}
        >
          <option value="direct">Direct</option>
          <option value="support">Support</option>
          <option value="sale">Sale</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'new' | 'linked' | 'ignored')}
        >
          <option value="new">New</option>
          <option value="linked">Linked</option>
          <option value="ignored">Ignored</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {item ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}