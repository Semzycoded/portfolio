const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-5 bg-primary text-white">
            <div className="container text-center py-3">
                <p className="mb-1">
<<<<<<< HEAD
                    © {currentYear} Adeoye Semilore
=======
                    © {currentYear} Your Name
>>>>>>> e7882fc90c73bffec8882d0dd8da4a2e9cbc9fac
                </p>
                <div>
                    <a href="https://github.com/Semzycoded" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://wa.me/2348136151937" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                        Whatsapp
                    </a>
                    <a href="mailto:adeoyesemilore2007@gmail.com" className="text-white mx-2">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
