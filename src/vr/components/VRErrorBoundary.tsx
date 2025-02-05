import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class VRErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('VR Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-xl mb-4">VR View Not Available</h2>
            <p>Your browser may not support WebGL or 3D rendering.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
