import React from "react";

type AddTaskInputProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const AddTaskInput: React.FC<AddTaskInputProps> = ({
  title,
  setTitle,
}) => {
  return (
    <input
      className="border px-2 py-1 mr-2 rounded-lg"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="What should be done?"
      maxLength={100}
    />
  );
};
