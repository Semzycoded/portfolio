const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 bg-primary text-white">
      <div className="container text-center py-3">
        <p className="mb-1">© {currentYear} Adeoye Semilore</p>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/adeoye-semilore-343b89350/"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Semzycoded"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:adeoyesemilore2007@gmail.com" className="text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
