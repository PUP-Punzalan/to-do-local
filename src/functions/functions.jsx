export const getTasks = () => {
  const localTasks = JSON.parse(localStorage.getItem("localTasks"));
  if (localTasks) {
    return localTasks;
  }
};

export const addTask = (task) => {
  const localTasks = getTasks();
  const updatedTasks = [...localTasks, task];
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
};

export const editTask = (task) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((t) =>
    t.id === task.id ? { ...t, ...task } : t
  );
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
};

export const deleteTask = (taskId) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.filter((task) => task.id !== taskId);
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
};

export const doneTask = (taskId) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((task) =>
    task.id === taskId
      ? { ...task, is_completed: task.is_completed === 1 ? 0 : 1 }
      : task
  );
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
};

export const doneAllTasks = () => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((task) => ({
    ...task,
    is_completed: 1,
  }));
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
};

export const deleteAllTasks = () => {
  localStorage.setItem("localTasks", JSON.stringify([]));
};
