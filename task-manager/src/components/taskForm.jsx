import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, CardActions } from '@mui/material';
const { v4: uuidv4 } = require('uuid');


const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };

    onAdd(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          margin="normal"
          multiline
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Task
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskForm;
