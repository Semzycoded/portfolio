import '../styles/PortfolioStats.css'

const PortfolioStats = () => {
    const stats = [
        { label: 'Projects', value: '03', icon: '📁' },
        { label: 'Skills', value: '06', icon: '🎯' },
        { label: 'Experience', value: '1+', icon: '⚡' },
        { label: 'Clients', value: '5+', icon: '👥' },
    ]

    return (
        <div className="portfolio-stats-section py-5">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-card">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PortfolioStats
