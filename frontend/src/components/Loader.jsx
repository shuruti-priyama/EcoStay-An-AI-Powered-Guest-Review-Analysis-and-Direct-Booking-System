import React from 'react';

const Loader = ({ label = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-200 dark:border-forest-700 border-t-forest-700 dark:border-t-forest-300" />
      <p className="font-body text-sm text-ink/60 dark:text-sand-100/60">{label}</p>
    </div>
  );

  if (fullScreen) {
    return <div className="flex min-h-[60vh] items-center justify-center">{content}</div>;
  }
  return content;
};

export default Loader;
