import React from "react";
import { LoadingState } from "./loadingState";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Card } from "./card";
import { ColumnType, Task } from "../types";

type KanbanProps = {
  columnId: string;
  isLoading: boolean;
  column: ColumnType;
  setTasks: (value: React.SetStateAction<Task[]>) => void;
};

export const Kanban: React.FC<KanbanProps> = ({
  columnId,
  isLoading,
  column,
  setTasks,
}) => {
  return (
    <div key={columnId} className="bg-zinc-700 p-2 rounded-lg">
      <h2 className="text-lg font-bold mb-2">{column.name}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[100px] space-y-2"
          >
            {!isLoading ? (
              column.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Card task={item} provided={provided} setTasks={setTasks} />
                  )}
                </Draggable>
              ))
            ) : (
              <LoadingState />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
