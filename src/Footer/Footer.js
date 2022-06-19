import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <a
          target="_blank"
          aria-label="Check the author on LinkedIn"
          href="https://www.linkedin.com/in/deyan-vasilev/"
        >
          <i className="fa fa-brands fa-linkedin"></i>
        </a>
        <a
          target="_blank"
          aria-label="Check the author on GitHub"
          href="https://github.com/lemonstener"
        >
          <i className="fa fa-brands fa-github"></i>
        </a>
        <a
          target="_blank"
          aria-label="Check this project on GitHub"
          href="https://github.com/lemonstener/mixer-frontend"
        >
          <i className="fa fa-solid fa-code-branch"></i>
        </a>
      </div>
      <span>Website created by Deyan Vasilev</span>
    </footer>
  );
};

export default Footer;
