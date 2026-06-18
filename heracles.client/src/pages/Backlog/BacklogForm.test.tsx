import React from 'react';
import { render,screen  }  from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BacklogForm } from './BacklogForm';

describe('BacklogForm Component', () => {
  it('renders create form', () => {
    render(
      <BacklogForm
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('renders edit form with populated values', () => {
    const item = {
      id: 1,
      title: 'Feature 1',
      description: 'Desc 1',
      type: 'feature',
      status: 'idea',
      priority: 50,
    };

    render(
      <BacklogForm
        item={item}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByLabelText('Title')).toHaveValue('Feature 1');
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = jest.fn();
    render(
      <BacklogForm
        onSubmit={onSubmit}
        onCancel={() => {}}
      />
    );

    await userEvent.type(screen.getByLabelText('Title'), 'New Feature');
    await userEvent.type(screen.getByLabelText('Description'), 'New desc');
    await userEvent.selectOptions(screen.getByLabelText('Type'), 'bug');
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'in_progress');
    await userEvent.type(screen.getByLabelText('Priority (0-100)'), '75');

    screen.getByText('Create').click();

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'New Feature',
      description: 'New desc',
      type: 'bug',
      status: 'in_progress',
      priority: 75,
    });
  });

  it('calls onCancel when clicking Cancel', async () => {
    const onCancel = jest.fn();
    render(
      <BacklogForm
        onSubmit={() => {}}
        onCancel={onCancel}
      />
    );

    screen.getByText('Cancel').click();
    expect(onCancel).toHaveBeenCalled();
  });
});