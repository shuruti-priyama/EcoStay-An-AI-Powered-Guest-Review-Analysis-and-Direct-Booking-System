import React from 'react';

const STYLES = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  approved: 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-sand-200',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  cancelled: 'bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${STYLES[status] || 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300'}`}>
    {status}
  </span>
);

export default StatusBadge;
