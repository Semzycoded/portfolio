import React from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    // Log error to console (could be sent to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-primary)',
            padding: '2rem',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '600px',
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              border: '2px solid var(--accent)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={{
                fontSize: '4rem',
                marginBottom: '1rem',
              }}
            >
              ⚠️
            </motion.div>

            <h1
              style={{
                marginBottom: '1rem',
                fontSize: '2rem',
                color: 'var(--accent)',
              }}
            >
              Oops! Something went wrong
            </h1>

            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                lineHeight: '1.6',
              }}
            >
              We encountered an unexpected error. Our team has been notified and
              is working to fix the issue. Please try again later.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details (Development Only)
                </summary>
                <pre
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                  }}
                >
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Go Back Home
            </motion.button>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
