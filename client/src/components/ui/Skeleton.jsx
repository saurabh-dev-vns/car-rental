import React from 'react';

const Skeleton = ({ className = '', width, height }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-zinc-700 rounded ${className}`}
      style={{ width, height }}
    />
  );
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
    </div>
    <Skeleton className="h-4 w-24" />
  </div>
);

export { Skeleton, SkeletonCard };