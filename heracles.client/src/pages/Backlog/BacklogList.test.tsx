import React from 'react';
import { render, screen } from '@testing-library/react';
import { BacklogList } from './BacklogList';
import type { BacklogItem } from '../../types/backlog';

const mockItems: BacklogItem[] = [
  {
    id: 1,
    uuid: 'uuid-1',
    title: 'Feature 1',
    description: 'Desc 1',
    type: 'feature',
    status: 'idea',
    priority: 50,
    createdById: 1,
    createdBy: { email: 'user@example.com' },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    deletedAt: null,
  },
];

describe('BacklogList Component', () => {
  it('renders items', () => {
    render(
      <BacklogList
        items={mockItems}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  it('shows empty state when no items', () => {
    render(
      <BacklogList
        items={[]}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText(/Aucun item dans le backlog/)).toBeInTheDocument();
  });

  it('calls onEdit when clicking Edit', () => {
    const onEdit = jest.fn();
    render(
      <BacklogList
        items={mockItems}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    screen.getByText('Edit').click();
    expect(onEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls onDelete when clicking Delete', () => {
    const onDelete = jest.fn();
    render(
      <BacklogList
        items={mockItems}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    screen.getByText('Delete').click();
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});