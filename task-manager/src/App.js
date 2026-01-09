import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { getTasks, saveTasks } from './utils/storage';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = (task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Manager</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <TaskForm onAdd={handleAddTask} />
        <TaskTable tasks={tasks} setTasks={setTasks} />
      </Container>
    </>
  );
}

export default App;
