import React, { useState } from 'react';
import { useBacklog, useCreateBacklog, useUpdateBacklog, useDeleteBacklog } from '../../services/useBacklog';
import { BacklogList } from './BacklogList';
import { BacklogFilters } from '../../components/Backlog/BacklogFilters';
import { BacklogModal } from './BacklogModal';
import type { BacklogItem, BacklogItemCreate } from '../../types/backlog';

interface BacklogFiltersState {
  type: '' | 'feature' | 'bug' | 'initiative';
  status: '' | 'idea' | 'in_progress' | 'done';
  search: string;
}

function Backlog() {
  const { data: items = [], isLoading } = useBacklog();
  const createBacklog = useCreateBacklog();
  const updateBacklog = useUpdateBacklog();
  const deleteBacklog = useDeleteBacklog();

  const [filters, setFilters] = useState<BacklogFiltersState>({
    type: '',
    status: '',
    search: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | undefined>(undefined);

  // Filtrage
  const filteredItems = items.filter((item) => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleCreate = (data: BacklogItemCreate) => {
    createBacklog.mutate(data as BacklogItem);
    setModalOpen(false);
  };

  const handleUpdate = (data: BacklogItemCreate) => {
    if (!editingItem) return;
    updateBacklog.mutate({ id: editingItem.id, item: data as BacklogItem });
    setModalOpen(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: BacklogItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer cet item ?')) {
      deleteBacklog.mutate(id);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(undefined);
    setModalOpen(true);
  };

  return (
    <div className="backlog-page">
      <h1>Backlog</h1>

      <div className="backlog-header">
        <BacklogFilters filters={filters} setFilters={setFilters} />
        <button onClick={handleOpenCreate} className="btn-create">
          + Create Item
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <BacklogList
          items={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BacklogModal
        isOpen={modalOpen}
        item={editingItem}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(undefined);
        }}
      />
    </div>
  );
}

export default Backlog;