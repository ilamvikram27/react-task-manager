// TaskTable.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from './TaskTable';
import ConfirmDialog from './confirmDialog';
import { saveTasks } from '../utils/storage';

// Mock saveTasks function
jest.mock('../utils/storage', () => ({
  saveTasks: jest.fn()
}));

// Mock ConfirmDialog to simplify testing
jest.mock('./confirmDialog', () => ({ open, onClose, message }) => {
  return open ? (
    <div data-testid="confirm-dialog">
      <button onClick={() => onClose(true)}>Confirm</button>
      <span>{message}</span>
    </div>
  ) : null;
});

describe('TaskTable Component', () => {
  let tasks;
  let setTasksMock;

  beforeEach(() => {
    tasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false },
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: true }
    ];
    setTasksMock = jest.fn();
    jest.clearAllMocks();
  });

  test('renders tasks in the table', () => {
    render(<TaskTable tasks={tasks} setTasks={setTasksMock} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  test('filters tasks correctly', () => {
    render(<TaskTable tasks={tasks} setTasks={setTasksMock} />);

    // Click Completed filter
    fireEvent.click(screen.getByRole('button', { name: /completed/i }));
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Click Pending filter
    fireEvent.click(screen.getByRole('button', { name: /pending/i }));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();

    // Click All filter
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('toggles completed state', () => {
    render(<TaskTable tasks={tasks} setTasks={setTasksMock} />);
    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);

    expect(setTasksMock).toHaveBeenCalledWith([
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: true },
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: true }
    ]);
    expect(saveTasks).toHaveBeenCalled();
  });

  test('opens confirm dialog on delete', () => {
    render(<TaskTable tasks={tasks} setTasks={setTasksMock} />);
    const deleteButton = screen.getAllByRole('button', { name: '' })[0]; // IconButton has no name

    fireEvent.click(deleteButton);

    expect(screen.getByTestId('confirm-dialog')).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  test('deletes task when confirm is clicked', () => {
    render(<TaskTable tasks={tasks} setTasks={setTasksMock} />);
    const deleteButton = screen.getAllByRole('button', { name: '' })[0];

    // Open confirm dialog
    fireEvent.click(deleteButton);

    // Click confirm
    fireEvent.click(screen.getByText('Confirm'));

    expect(setTasksMock).toHaveBeenCalledWith([
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: true }
    ]);
    expect(saveTasks).toHaveBeenCalled();
  });
});
