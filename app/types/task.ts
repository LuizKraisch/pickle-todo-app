import { Character } from "./character";

export type Task = {
  id: string;
  title: string;
  character: Character;
  column: "todo" | "doing" | "done" | string;
};
