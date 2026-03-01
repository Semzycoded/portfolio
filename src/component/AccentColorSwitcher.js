import { useState, useEffect } from 'react'
import '../styles/AccentColorSwitcher.css'

const AccentColorSwitcher = () => {
    const [showPicker, setShowPicker] = useState(false)
    const [accentColor, setAccentColor] = useState('#0d6efd')

    const colors = [
        { name: 'Blue', value: '#0d6efd' },
        { name: 'Purple', value: '#9c27b0' },
        { name: 'Cyan', value: '#00bcd4' },
        { name: 'Green', value: '#4caf50' },
        { name: 'Orange', value: '#ff9800' },
        { name: 'Pink', value: '#e91e63' },
        { name: 'Red', value: '#f44336' },
        { name: 'Teal', value: '#009688' },
    ]

    useEffect(() => {
        const savedColor = localStorage.getItem('accentColor') || '#0d6efd'
        setAccentColor(savedColor)
        applyAccentColor(savedColor)
    }, [])

    const applyAccentColor = (color) => {
        document.documentElement.style.setProperty('--accent', color)
    }

    const handleColorChange = (color) => {
        setAccentColor(color)
        localStorage.setItem('accentColor', color)
        applyAccentColor(color)
    }

    return (
        <div className="accent-color-switcher">
            <button
                className="color-switcher-btn"
                onClick={() => setShowPicker(!showPicker)}
                title="Change accent color"
            >
                🎨
            </button>
            {showPicker && (
                <div className="color-picker-panel">
                    <h6 className="picker-title">Select Color</h6>
                    <div className="color-grid">
                        {colors.map((color) => (
                            <button
                                key={color.value}
                                className={`color-option ${accentColor === color.value ? 'active' : ''}`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => handleColorChange(color.value)}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccentColorSwitcher
