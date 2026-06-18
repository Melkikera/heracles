import React, { useState } from 'react';
import { useRoadmap, useCreateRoadmap, useUpdateRoadmap, useDeleteRoadmap } from '../../services/useRoadmap';
import { useBacklog } from '../../services/useBacklog';
import { RoadmapList } from '../../components/Roadmap/RoadmapList';
import { RoadmapFilters } from '../../components/Roadmap/RoadmapFilters';
import { RoadmapModal } from './RoadmapModal';
import { RoadmapTimeline } from './RoadmapTimeline';
import type { RoadmapItem, RoadmapItemCreate } from '../../types/roadmap';

interface RoadmapFiltersState {
  quarter: string;
  search: string;
}

function Roadmap() {
  const { data: roadmapItems = [], isLoading: isLoadingRoadmap } = useRoadmap();
  const { data: backlogItems = [], isLoading: isLoadingBacklog } = useBacklog();
  const createRoadmap = useCreateRoadmap();
  const updateRoadmap = useUpdateRoadmap();
  const deleteRoadmap = useDeleteRoadmap();

  const [filters, setFilters] = useState<RoadmapFiltersState>({
    quarter: '',
    search: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RoadmapItem | undefined>(undefined);

  // Filtrage
  const filteredItems = roadmapItems.filter((item) => {
    if (filters.quarter && item.quarter !== filters.quarter) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Préparation backlog items pour le formulaire
  const backlogOptions = backlogItems.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  const handleCreate = (data: RoadmapItemCreate) => {
    createRoadmap.mutate(data);
    setModalOpen(false);
  };

  const handleUpdate = (data: RoadmapItemCreate) => {
    if (!editingItem) return;
    updateRoadmap.mutate({ id: editingItem.id, item: data });
    setModalOpen(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: RoadmapItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer cet item ?')) {
      deleteRoadmap.mutate(id);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(undefined);
    setModalOpen(true);
  };

  return (
    <div className="roadmap-page">
      <h1>Roadmap</h1>

      <div className="roadmap-header">
        <RoadmapFilters filters={filters} setFilters={setFilters} />
        <button onClick={handleOpenCreate} className="btn-create">
          + Create Item
        </button>
      </div>

      {/* Vue Timeline */}
      <div className="roadmap-timeline-section">
        <h2>Timeline</h2>
        <RoadmapTimeline items={filteredItems} />
      </div>

      {/* Liste */}
      <div className="roadmap-list-section">
        <h2>All Items</h2>
        {isLoadingRoadmap || isLoadingBacklog ? (
          <div className="loading">Loading...</div>
        ) : (
          <RoadmapList
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <RoadmapModal
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

export default Roadmap;