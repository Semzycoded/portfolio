// Project Manager - Store and retrieve editable projects

const DEFAULT_PROJECTS = [
    {
        id: '1',
        title: 'CoinPay Mobile App',
        description:
            'CoinPay is a mobile app for seamless, secure cryptocurrency payments and transfers. Manage, send, and receive crypto instantly with an intuitive interface.',
        technologies: ['React', 'Bootstrap', 'Custom CSS'],
        imageUrl:
            'https://cdn.dribbble.com/userupload/4274903/file/original-1171193ce6dc31fddb0a3c879155978e.jpg?resize=752x',
        githubUrl: 'https://github.com/Semzycoded/Coinpay-Mobile-App',
        liveDemoUrl: 'https://coinpay-mobile-app.vercel.app/',
    },
    {
        id: '2',
        title: 'Food Recipe Website',
        description:
            'A dynamic recipe web application that fetches real-time data from a public API, allowing users to explore and filter meals.',
        technologies: ['React', 'Tailwind CSS'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Food+Recipe',
        githubUrl: 'https://github.com/Semzycoded/food-recipe-website',
        liveDemoUrl: 'https://food-recipe-website-one.vercel.app',
    },
    {
        id: '3',
        title: 'Solvex Website',
        description:
            'A platform that connects students and graduates to get academic advice and guidance for passing courses.',
        technologies: ['React', 'Tailwind CSS', 'Firebase'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Solvex',
        githubUrl: 'https://github.com/Semzycoded/solvex1',
        liveDemoUrl: 'https://solvex1.vercel.app',
    },
]

export const getAllProjects = () => {
    try {
        const stored = localStorage.getItem('portfolioProjects')
        return stored ? JSON.parse(stored) : DEFAULT_PROJECTS
    } catch (err) {
        return DEFAULT_PROJECTS
    }
}

export const addProject = (project) => {
    try {
        const projects = getAllProjects()
        const newProject = {
            ...project,
            id: Date.now().toString(),
        }
        projects.push(newProject)
        localStorage.setItem('portfolioProjects', JSON.stringify(projects))
        return newProject
    } catch (err) {
        return null
    }
}

export const updateProject = (id, updatedProject) => {
    try {
        const projects = getAllProjects()
        const index = projects.findIndex((p) => p.id === id)
        if (index > -1) {
            projects[index] = { ...projects[index], ...updatedProject }
            localStorage.setItem('portfolioProjects', JSON.stringify(projects))
            return projects[index]
        }
        return null
    } catch (err) {
        return null
    }
}

export const deleteProject = (id) => {
    try {
        const projects = getAllProjects()
        const filtered = projects.filter((p) => p.id !== id)
        localStorage.setItem('portfolioProjects', JSON.stringify(filtered))
        return true
    } catch (err) {
        return false
    }
}

export const resetProjectsToDefaults = () => {
    try {
        localStorage.removeItem('portfolioProjects')
        return true
    } catch (err) {
        return false
    }
}

export const createEmptyProject = () => {
    return {
        title: '',
        description: '',
        technologies: [],
        imageUrl: '',
        githubUrl: '',
        liveDemoUrl: '',
    }
}
