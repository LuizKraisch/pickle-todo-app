import React from "react";

type AddTaskButtonProps = {
  title: string;
  handleAdd: () => void;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ title, handleAdd }) => {
  return (
    <button
      className="bg-indigo-700 hover:bg-indigo-800 font-bold px-4 py-1 rounded-lg"
      onClick={handleAdd}
    >
      {title}
    </button>
  );
};
