import React from "react";
import { Task } from "../types";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { handleDelete } from "../hooks";
import { TrashIcon } from "../assets";

type CardProps = {
  task: Task;
  provided: DraggableProvided;
  setTasks: (value: React.SetStateAction<Task[]>) => void;
};

export const Card: React.FC<CardProps> = ({ task, provided, setTasks }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="p-2 bg-zinc-500 rounded-lg flex items-center gap-2"
    >
      <img src={task.character.image} className="w-10 h-10 rounded-full" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center gap-2">
          <p className="font-bold text-white truncate whitespace-nowrap overflow-hidden min-w-0">
            {task.title}
          </p>
          <button
            onClick={() => handleDelete(setTasks, task.id)}
            className="text-white hover:text-red-400 shrink-0"
          >
            <TrashIcon />
          </button>
        </div>
        <p className="text-xs text-white">{task.character.name}</p>
      </div>
    </div>
  );
};
