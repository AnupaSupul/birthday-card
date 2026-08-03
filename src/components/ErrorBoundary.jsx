import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[ErrorBoundary] ${this.props.name || 'Component'} crashed:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white">
            <div className="glass-card p-8 text-center max-w-md">
              <p className="text-2xl mb-2">✨</p>
              <p className="text-lg font-outfit text-gray-300">
                This section is taking a nap. Scroll on!
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
