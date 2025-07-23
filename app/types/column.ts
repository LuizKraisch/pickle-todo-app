import { Task } from "./task";

export type columnSource = {
  index: number;
  droppableId: "todo" | "doing" | "done";
};

export type ColumnType = {
  name: string;
  items: Task[];
};

export type ColumnsState = {
  todo: ColumnType;
  doing: ColumnType;
  done: ColumnType;
};
