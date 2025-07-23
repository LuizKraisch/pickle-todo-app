import { Character, ColumnsState, Task } from "../types";

export const handleAdd = (
  title: string,
  characters: Character[],
  setTasks: (value: React.SetStateAction<Task[]>) => void,
  setColumns: (value: React.SetStateAction<ColumnsState>) => void,
  setTitle: (value: React.SetStateAction<string>) => void
) => {
  if (!title.trim() || characters.length === 0) return;

  const randomChar = characters[Math.floor(Math.random() * characters.length)];

  const newItem: Task = {
    id: `${Date.now()}`, // Could it be an UUID
    title,
    character: randomChar,
    column: "todo",
  };

  // Add tasks to the task state
  setTasks((prev) => [...prev, newItem]);

  // Insert the new task on the todo column
  setColumns((prev) => ({
    ...prev,
    todo: {
      ...prev.todo,
      items: [...prev.todo.items, newItem],
    },
  }));
  setTitle("");
};

export const handleDelete = (
  setTasks: (value: React.SetStateAction<Task[]>) => void,
  taskId: string
) => {
  setTasks((prev) => prev.filter((task) => task.id !== taskId));
};
