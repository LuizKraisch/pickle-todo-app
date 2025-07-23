"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";

import { fetchCharacters } from "./lib";
import { Task, Character, ColumnsState } from "./types";
import { AddTaskInput, AddTaskButton, Kanban } from "./components";
import { PickleIcon } from "./assets";
import { handleAdd } from "./hooks";

const todoListColumns: ColumnsState = {
  todo: { name: "Todo", items: [] },
  doing: { name: "Doing", items: [] },
  done: { name: "Done", items: [] },
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [columns, setColumns] = useState<ColumnsState>(todoListColumns);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load characters and tasks
  useEffect(() => {
    setIsLoading(true);
    fetchCharacters().then(setCharacters);
    const saved = localStorage.getItem("pickle-todo-tasks");
    if (saved) {
      setIsLoading(false);
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Organize tasks after loading
  useEffect(() => {
    localStorage.setItem("pickle-todo-tasks", JSON.stringify(tasks));

    const grouped: { [key: string]: Task[] } = {
      todo: [],
      doing: [],
      done: [],
    };

    tasks.forEach((task: Task) => {
      grouped[task.column]?.push(task);
    });

    setColumns({
      todo: { name: "Todo", items: grouped.todo },
      doing: { name: "Doing", items: grouped.doing },
      done: { name: "Done", items: grouped.done },
    });
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId as keyof ColumnsState];
    const destColumn = columns[destination.droppableId as keyof ColumnsState];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Updates to avoid having dup keys on the same column
      sourceItems.splice(destination.index, 0, movedItem);

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      }));
    } else {
      // Updates the columns accordingly
      movedItem.column = destination.droppableId;
      destItems.splice(destination.index, 0, movedItem);

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    }

    // Update the moved task in the tasks state
    setTasks((prev) =>
      prev.map((t) => (t.id === movedItem.id ? { ...movedItem } : t))
    );

    if (
      destination.droppableId === "done" &&
      source.droppableId !== destination.droppableId
    ) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5, x: 0.8 },
      });
    }
  };

  return (
    <div className="items-center p-8 pb-20 gap-16 pl-20 pr-20 pt-10">
      <div className="flex space-x-2">
        <PickleIcon />
        <h1 className="text-2xl font-bold mb-5">Pickle Todo App</h1>
      </div>
      <div className="flex mb-4">
        <AddTaskInput title={title} setTitle={setTitle} />
        <AddTaskButton
          title="Add Task"
          handleAdd={() =>
            handleAdd(title, characters, setTasks, setColumns, setTitle)
          }
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 h-150">
          {Object.entries(columns).map(([columnId, column]) => (
            <Kanban
              key={columnId}
              columnId={columnId}
              column={column}
              isLoading={isLoading}
              setTasks={setTasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
