import React, { useState, useEffect } from 'react';
import type { BacklogItem, BacklogItemCreate } from '../../types/backlog';

interface BacklogFormProps {
  item?: BacklogItem;
  onSubmit: (data: BacklogItemCreate) => void;
  onCancel: () => void;
}

export function BacklogForm({ item, onSubmit, onCancel }: BacklogFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'feature' | 'bug' | 'initiative'>('feature');
  const [status, setStatus] = useState<'idea' | 'in_progress' | 'done'>('idea');
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setType(item.type || 'feature');
      setStatus(item.status || 'idea');
      setPriority(item.priority || 0);
    } else {
      setTitle('');
      setDescription('');
      setType('feature');
      setStatus('idea');
      setPriority(0);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Form submitted with values:', { title, description, type, status, priority, createdBy:{ email: 'admin@example.com' } });
    e.preventDefault();
    onSubmit({
      title,
      description,
      type,
      status,
      priority,
      createdBy: { email: 'admin@example.com' },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="backlog-form">
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'feature' | 'bug' | 'initiative')}
        >
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="initiative">Initiative</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'idea' | 'in_progress' | 'done')}
        >
          <option value="idea">Idea</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority (0-100)</label>
        <input
          id="priority"
          type="number"
          min={0}
          max={100}
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        />
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