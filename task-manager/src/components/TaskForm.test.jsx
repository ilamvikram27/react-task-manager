// TaskForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

// Mock uuid to return a consistent id
jest.mock('uuid', () => ({
  v4: () => '1234-5678'
}));

describe('TaskForm Component', () => {
  test('renders input fields and button', () => {
    render(<TaskForm onAdd={jest.fn()} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('calls onAdd with correct task data', () => {
    const onAddMock = jest.fn();
    render(<TaskForm onAdd={onAddMock} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(onAddMock).toHaveBeenCalledTimes(1);
    expect(onAddMock).toHaveBeenCalledWith({
      id: '1234-5678',
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      createdAt: expect.any(Date),
    });
  });

  test('clears input fields after adding task', () => {
    const onAddMock = jest.fn();
    render(<TaskForm onAdd={onAddMock} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  test('does not call onAdd if title is empty', () => {
    const onAddMock = jest.fn();
    render(<TaskForm onAdd={onAddMock} />);

    const addButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addButton);

    expect(onAddMock).not.toHaveBeenCalled();
  });
});
