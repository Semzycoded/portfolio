import { useState, useEffect } from 'react'
import '../styles/PerformanceMetrics.css'

const PerformanceMetrics = () => {
    const [metrics, setMetrics] = useState({
        loadTime: 0,
        memoryUsage: 0,
    })
    const [showMetrics, setShowMetrics] = useState(false)

    useEffect(() => {
        if (window.performance) {
            const perfData = window.performance.timing
            const loadTime = perfData.loadEventEnd - perfData.navigationStart
            setMetrics((prev) => ({ ...prev, loadTime }))
        }

        if (performance.memory) {
            const memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576)
            setMetrics((prev) => ({ ...prev, memoryUsage: memUsage }))
        }
    }, [])

    return (
        <div className="performance-metrics">
            <button
                className="metrics-toggle"
                onClick={() => setShowMetrics(!showMetrics)}
                title="Toggle performance metrics"
            >
                ⚡
            </button>
            {showMetrics && (
                <div className="metrics-panel">
                    <div className="metric-item">
                        <span className="metric-label">Load Time:</span>
                        <span className="metric-value">{metrics.loadTime}ms</span>
                    </div>
                    <div className="metric-item">
                        <span className="metric-label">Memory:</span>
                        <span className="metric-value">{metrics.memoryUsage}MB</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PerformanceMetrics
