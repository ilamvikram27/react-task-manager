
import { getTasks, saveTasks } from './storage';

test('save and get tasks', () => {
  const tasks = [{ id: '1', title: 'Test Task' }];
  saveTasks(tasks);

  const result = getTasks();
  expect(result).toEqual(tasks);
});
