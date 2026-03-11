import React from 'react';
import Github from '../svg/Github - Negative.svg';
import Linkedin from '../svg/LinkedIn - Negative.svg';
import Instagram from '../svg/Instagram - Negative.svg';
import Discord from '../svg/Discord - Negative.svg';
import Telegram from '../svg/Telegram - Negative.svg';

const Footer = () => {
  const social = [
    {
      name: 'Linkedin',
      link: 'https://www.linkedin.com/in/anas-zarqawi/',
      icon: <Linkedin className="social-icon" />,
    },
    {
      name: 'Github',
      link: 'https://github.com/anaszarqawi',
      icon: <Github className="social-icon" />,
    },
    {
      name: 'Discord',
      link: 'https://discordapp.com/users/823643786499981324',
      icon: <Discord className="social-icon" />,
    },
    {
      name: 'Telegram',
      link: 'https://www.t.me/anaszarqawi',
      icon: <Telegram className="social-icon" />,
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/anaszarqawi_/',
      icon: <Instagram className="social-icon" />,
    },
  ];

  return (
    <div className="footer">
      <div className="social">
        {social.map((site) =>
          <a
            key={site.name}
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-container"
          >{site.icon}</a>

        )}
      </div>
      <span className="copyright">© {new Date().getFullYear()} anaszarqawi.</span>
      <div className="version">
        v4.1
      </div>
    </div>
  );
};

export default Footer;
