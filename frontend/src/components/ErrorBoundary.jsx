import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
          <AlertTriangle size={48} className="text-clay-400" />
          <h1 className="font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">
            Something went off-trail
          </h1>
          <p className="max-w-md font-body text-sm text-ink/60 dark:text-sand-100/60">
            An unexpected error occurred while loading this page. Try heading back home, or
            reload if the problem continues.
          </p>
          <button onClick={this.handleReload} className="btn-primary mt-3">
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;