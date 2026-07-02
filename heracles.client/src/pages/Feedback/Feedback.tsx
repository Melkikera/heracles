import { useState } from 'react';
import { useFeedback, useCreateFeedback, useUpdateFeedback, useDeleteFeedback } from '../../services/useFeedback';
import { useBacklog } from '../../services/useBacklog';
import { FeedbackList } from '../../components/Feedback/FeedbackList';
import { FeedbackModal } from './FeedbackModal';
import type { Feedback, FeedbackCreate } from '../../types/feedback';
import { FeedbackToolbar } from '../../components/Feedback/FeedbackToolbar';
import type { FeedbackItem } from '../../components/Feedback/FeedbackCard';

interface FeedbackFiltersState {
  source: string;
  status: string;
  search: string;
}

function Feedback() {
  const { data: feedbackItems = [], isLoading: isLoadingFeedback } = useFeedback();
  const { data: backlogItems = [], isLoading: isLoadingBacklog } = useBacklog();
  const createFeedback = useCreateFeedback();
  const updateFeedback = useUpdateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const [filters, setFilters] = useState<FeedbackFiltersState>({
    source: '',
    status: '',
    search: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Feedback | undefined>(undefined);

  // Filtrage
  const filteredItems = feedbackItems.filter((item) => {
    if (filters.source && item.source !== filters.source) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Préparation backlog items pour le formulaire
  const backlogOptions = backlogItems.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  const handleCreate = (data: FeedbackCreate) => {
    createFeedback.mutate(data);
    setModalOpen(false);
  };

  const handleUpdate = (data: FeedbackCreate) => {
    if (!editingItem) return;
    updateFeedback.mutate({ id: editingItem.id, item: data });
    setModalOpen(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: FeedbackItem) => {
    setEditingItem(item as Feedback);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce feedback ?')) {
      deleteFeedback.mutate(id);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(undefined);
    setModalOpen(true);
  };

  return (
    <div className="feedback-page">

      <div className="feedback-header">
        <FeedbackToolbar onCreate={handleOpenCreate}
        search={filters.search}
        onSearchChange={(value) => setFilters((f) => ({ ...f, search: value, page: 1 }))}
        source={filters.source}
        onSourceChange={(value) => setFilters((f) => ({ ...f, source: value, page: 1 }))}
        status={filters.status}
        onStatusChange={(value) => setFilters((f) => ({ ...f, status: value, page: 1 }))}
        totalCount={filteredItems?.length}
        />        
      </div>

      {isLoadingFeedback || isLoadingBacklog ? (
        <div className="loading">Loading...</div>
      ) : (
        <FeedbackList
          items={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <FeedbackModal
        isOpen={modalOpen}
        item={editingItem}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(undefined);
        }}
        backlogItems={backlogOptions}
      />
    </div>
  );
}

export default Feedback;