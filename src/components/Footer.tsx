import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <span className="copyright">© {new Date().getFullYear()} anaszarqawi.</span>
      <a className="version" href="https://github.com/anaszarqawi/mti-gpa-calculator" target="blank">
        v3.0
      </a>
    </div>
  );
};

export default Footer;
