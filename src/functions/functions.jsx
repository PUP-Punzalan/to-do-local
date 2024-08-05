import { toast } from "react-toastify";

export const getTasks = () => {
  const localTasks = JSON.parse(localStorage.getItem("localTasks"));

  if (!localTasks) {
    localStorage.setItem("localTasks", JSON.stringify([]));
    return [];
  }

  return localTasks;
};

export const addTask = (task) => {
  const localTasks = getTasks();
  const updatedTasks = [...localTasks, task];
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  toast.success("Task added successfully!");
};

export const editTask = (task) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((t) =>
    t.id === task.id ? { ...t, ...task } : t
  );
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  toast.success("Task updated successfully!");
};

export const deleteTask = (taskId) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.filter((task) => task.id !== taskId);
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  toast.success("Task deleted successfully!");
};

export const doneTask = (taskId) => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((task) =>
    task.id === taskId
      ? { ...task, is_completed: task.is_completed === 1 ? 0 : 1 }
      : task
  );
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  toast.success("Task updated successfully!");
};

export const doneAllTasks = () => {
  const localTasks = getTasks();
  const updatedTasks = localTasks.map((task) => ({
    ...task,
    is_completed: 1,
  }));
  localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  toast.success("All tasks completed successfully!");
};

export const deleteAllTasks = () => {
  localStorage.setItem("localTasks", JSON.stringify([]));
  toast.success("All tasks deleted successfully!");
};
