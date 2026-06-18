import React, { useState, useEffect } from 'react';
import type { RoadmapItem, RoadmapItemCreate } from '../../types/roadmap';

interface RoadmapFormProps {
  item?: RoadmapItem;
  onSubmit: (data: RoadmapItemCreate) => void;
  onCancel: () => void;
  backlogItems: { id: number; title: string }[]; // Optionnel: liste backlog
}

export function RoadmapForm({ item, onSubmit, onCancel, backlogItems = [] }: RoadmapFormProps) {
  const [backlogItemId, setBacklogItemId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quarter, setQuarter] = useState('');

  useEffect(() => {
    if (item) {
      setBacklogItemId(item.backlogItemId);
      setTitle(item.title);
      setDescription(item.description || '');
      setStartDate(item.startDate);
      setEndDate(item.endDate);
      setQuarter(item.quarter || '');
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      backlogItemId,
      title,
      description,
      startDate,
      endDate,
      quarter,
      createdBy: {
        email: 'admin@example.com', // Remplacez par l'email de l'utilisateur connecté si disponible
      },
      backlogItem: {
        id: backlogItemId,
        createdBy: {
        email: 'admin@example.com', // Remplacez par l'email de l'utilisateur connecté si disponible
      },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="roadmap-form">
      <div className="form-group">
        <label htmlFor="backlogItem">Backlog Item</label>
        <select
          id="backlogItem"
          value={backlogItemId}
          onChange={(e) => setBacklogItemId(Number(e.target.value))}
          required
        >
          <option value={0}>Sélectionner un backlog item</option>
          {backlogItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

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
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quarter">Quarter</label>
        <select
          id="quarter"
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        >
          <option value="">Sans quarter</option>
          <option value="Q1 2026">Q1 2026</option>
          <option value="Q2 2026">Q2 2026</option>
          <option value="Q3 2026">Q3 2026</option>
          <option value="Q4 2026">Q4 2026</option>
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