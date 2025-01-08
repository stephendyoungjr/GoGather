import React from 'react';

function Footer() {
  const GITHUB_PROFILE_PATH = 'https://github.com/stephendyoungjr';
  const LINKEDIN_PROFILE_PATH = 'https://www.linkedin.com/in/sy438/';

  return (
    <footer className="footer">
      <a className="nav-link" href={GITHUB_PROFILE_PATH} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '20px' }}>
        GitHub
      </a>
      <a className="nav-link" href={LINKEDIN_PROFILE_PATH} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '20px' }}>
        LinkedIn
      </a>
    </footer>
  );
}

export default Footer;
