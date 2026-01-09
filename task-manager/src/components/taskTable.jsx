import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, IconButton, ButtonGroup, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './confirmDialog';
import { saveTasks } from '../utils/storage';

const TaskTable = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleToggle = (task) => {
    const updated = tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  const confirmDelete = (result) => {
    if (result && taskToDelete) {
      const updated = tasks.filter(t => t.id !== taskToDelete.id);
      setTasks(updated);
      saveTasks(updated);
    }
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <>
      <ButtonGroup sx={{ marginBottom: 2 }}>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
        >All</Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => setFilter('completed')}
        >Completed</Button>
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setFilter('pending')}
        >Pending</Button>
      </ButtonGroup>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(task)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={confirmOpen}
        onClose={confirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default TaskTable;
