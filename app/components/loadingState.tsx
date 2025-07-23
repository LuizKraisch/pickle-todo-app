import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <>
      <div className="flex animate-pulse space-x-4">
        <div className="size-10 w-150 h-15 rounded-lg bg-gray-200"></div>
      </div>
      <div className="flex animate-pulse space-x-4">
        <div className="size-10 w-150 h-15 rounded-lg bg-gray-200"></div>
      </div>
    </>
  );
};
