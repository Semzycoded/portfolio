// Portfolio Content Manager - Store and retrieve editable content

const DEFAULT_CONTENT = {
    skills: [
        { label: 'HTML/HTML5', value: 95, color: 'bg-success' },
        { label: 'CSS', value: 85, color: 'bg-info' },
        { label: 'JavaScript', value: 80, color: 'bg-warning' },
        { label: 'React', value: 90, color: 'bg-danger' },
        { label: 'Bootstrap', value: 85, color: 'bg-primary' },
        { label: 'Git', value: 75, color: 'bg-secondary' },
    ],
    about: {
        title: 'About Me',
        description: 'I am a passionate frontend developer with expertise in React and modern web technologies.',
    },
    hero: {
        title: 'Hi, I\'m Timothy',
        subtitle: 'I build responsive, user-friendly web applications using React and JavaScript.',
    }
}

export const getPortfolioContent = (key) => {
    try {
        const stored = localStorage.getItem(`portfolio_${key}`)
        return stored ? JSON.parse(stored) : DEFAULT_CONTENT[key]
    } catch (err) {
        return DEFAULT_CONTENT[key]
    }
}

export const setPortfolioContent = (key, content) => {
    try {
        localStorage.setItem(`portfolio_${key}`, JSON.stringify(content))
        return true
    } catch (err) {
        return false
    }
}

export const updateSkill = (index, updatedSkill) => {
    const skills = getPortfolioContent('skills')
    skills[index] = { ...skills[index], ...updatedSkill }
    return setPortfolioContent('skills', skills)
}

export const addSkill = (skill) => {
    const skills = getPortfolioContent('skills')
    skills.push(skill)
    return setPortfolioContent('skills', skills)
}

export const deleteSkill = (index) => {
    const skills = getPortfolioContent('skills')
    skills.splice(index, 1)
    return setPortfolioContent('skills', skills)
}

export const updateAbout = (content) => {
    return setPortfolioContent('about', content)
}

export const updateHero = (content) => {
    return setPortfolioContent('hero', content)
}

export const resetToDefaults = () => {
    Object.keys(DEFAULT_CONTENT).forEach(key => {
        localStorage.removeItem(`portfolio_${key}`)
    })
    return true
}

export const getPortfolioStats = () => {
    try {
        const stats = localStorage.getItem('portfolioStats')
        return stats ? JSON.parse(stats) : { projects: 0, skills: 0, experience: 0 }
    } catch (err) {
        return { projects: 0, skills: 0, experience: 0 }
    }
}

export const updatePortfolioStats = (stats) => {
    try {
        localStorage.setItem('portfolioStats', JSON.stringify(stats))
        return true
    } catch (err) {
        return false
    }
}
