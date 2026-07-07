import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
    <Compass size={48} className="text-clay-400" />
    <h1 className="font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">Looks like you wandered off the trail</h1>
    <p className="font-body text-sm text-ink/60 dark:text-sand-100/60">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary mt-3">Back to Home</Link>
  </div>
);

export default NotFound;
