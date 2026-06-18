import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Backlog } from './Backlog';
import wrapper from '../../mocks/wrapper';

describe('Backlog Page', () => {
  it('renders loading state initially', async () => {
    render(<Backlog />, { wrapper });

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('renders backlog items after loading', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no items', async () => {
    // Mock empty response
    // (à ajouter dans handlers si tu veux tester ce cas)
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/Aucun item dans le backlog/)).toBeInTheDocument();
    });
  });

  it('opens create modal when clicking Create Item', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      const createBtn = screen.getByText('+ Create Item');
      createBtn.click();
    });

    expect(screen.getByText('Create Backlog Item')).toBeInTheDocument();
  });

  it('creates a new backlog item', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      screen.getByText('+ Create Item').click();
    });

    // Fill form
    await userEvent.type(screen.getByLabelText('Title'), 'New Feature');
    await userEvent.type(screen.getByLabelText('Description'), 'New description');
    await userEvent.selectOptions(screen.getByLabelText('Type'), 'feature');
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'idea');
    await userEvent.type(screen.getByLabelText('Priority (0-100)'), '75');

    screen.getByText('Create').click();

    await waitFor(() => {
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });
  });

  it('opens edit modal when clicking Edit', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
    });

    screen.getByText('Edit').click();

    expect(screen.getByText('Edit Backlog Item')).toBeInTheDocument();
  });

  it('updates a backlog item', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
    });

    screen.getByText('Edit').click();

    await userEvent.clear(screen.getByLabelText('Title'));
    await userEvent.type(screen.getByLabelText('Title'), 'Updated Feature');

    screen.getByText('Update').click();

    await waitFor(() => {
      expect(screen.getByText('Updated Feature')).toBeInTheDocument();
    });
  });

  it('deletes a backlog item', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
    });

    screen.getByText('Delete').click();

    // Confirm dialog
    window.confirm = () => true;

    await waitFor(() => {
      expect(screen.queryByText('Feature 1')).not.toBeInTheDocument();
    });
  });

  it('filters by type', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });

    await userEvent.selectOptions(screen.getByLabelText('Type'), 'feature');

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.queryByText('Bug 1')).not.toBeInTheDocument();
    });
  });

  it('filters by status', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });

    await userEvent.selectOptions(screen.getByLabelText('Status'), 'idea');

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.queryByText('Bug 1')).not.toBeInTheDocument();
    });
  });

  it('searches by title', async () => {
    render(<Backlog />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByPlaceholderText('Rechercher...'), 'Feature');

    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.queryByText('Bug 1')).not.toBeInTheDocument();
    });
  });
});