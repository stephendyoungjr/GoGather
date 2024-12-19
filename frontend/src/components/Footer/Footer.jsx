import React from 'react';

function Footer() {
  const GITHUB_PROFILE_PATH = 'https://github.com/stephendyoungjr';

  return (
    <footer className="footer">
      <a className="nav-link" href={GITHUB_PROFILE_PATH} style={{ marginLeft: '20px' }}>
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
